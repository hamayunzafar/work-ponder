import React, { useEffect, useState } from 'react';
import hsocCta from '../assets/HSOC-CTA.svg';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { MoreVertical } from 'lucide-react';

interface StreamPost {
    id: string;
    created_at: string;
    title: string;
    content: string;
    image_url: string | null;
}

interface StreamDrawerProps {
    isOpen: boolean;
    onClose: () => void;
}

export const StreamDrawer: React.FC<StreamDrawerProps> = ({ isOpen, onClose }) => {
    const { user } = useAuth();
    const [shouldRender, setShouldRender] = useState(isOpen);
    const [isExiting, setIsExiting] = useState(false);
    
    // Data State
    const [posts, setPosts] = useState<StreamPost[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);

    // Upload State
    const [isUploading, setIsUploading] = useState(false);
    const [uploadTitle, setUploadTitle] = useState('');
    const [uploadContent, setUploadContent] = useState('');
    const [uploadFile, setUploadFile] = useState<File | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [editingPostId, setEditingPostId] = useState<string | null>(null);
    
    // UI State
    const [showMenu, setShowMenu] = useState(false);
    const [validationError, setValidationError] = useState(false);
    const [isRattling, setIsRattling] = useState(false);

    const isAdmin = user?.email === 'hzstrooper@gmail.com';

    const processImage = (file: File): Promise<File> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (event) => {
                const img = new Image();
                img.src = event.target?.result as string;
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    // Target width 1200px for high quality on retina screens within the 500px drawer
                    const MAX_WIDTH = 1200; 
                    let width = img.width;
                    let height = img.height;

                    if (width > MAX_WIDTH) {
                        height *= MAX_WIDTH / width;
                        width = MAX_WIDTH;
                    }

                    canvas.width = width;
                    canvas.height = height;
                    const ctx = canvas.getContext('2d');
                    ctx?.drawImage(img, 0, 0, width, height);

                    canvas.toBlob((blob) => {
                        if (blob) {
                            // Create new file with .webp extension
                            const newFileName = file.name.replace(/\.[^/.]+$/, "") + ".webp";
                            const newFile = new File([blob], newFileName, {
                                type: 'image/webp',
                                lastModified: Date.now(),
                            });
                            resolve(newFile);
                        } else {
                            reject(new Error('Canvas to Blob failed'));
                        }
                    }, 'image/webp', 0.85); // 0.85 quality is a sweet spot for WebP
                };
                img.onerror = (err) => reject(err);
            };
            reader.onerror = (err) => reject(err);
        });
    };

    useEffect(() => {
        if (isOpen) {
            setShouldRender(true);
            setIsExiting(false);
            document.body.style.overflow = 'hidden';
            fetchPosts();
        } else {
            setIsExiting(true);
            const timer = setTimeout(() => {
                setShouldRender(false);
                document.body.style.overflow = 'unset';
                // Reset state on close
                setIsUploading(false);
            }, 400);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    const fetchPosts = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('stream_posts')
            .select('*')
            .eq('published', true)
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching posts:', error);
        } else {
            setPosts(data || []);
        }
        setLoading(false);
    };

    const handleUpload = async (e: React.FormEvent) => {
        e.preventDefault();
        
        // Validation
        if (!uploadTitle || !uploadContent) {
            setValidationError(true);
            setIsRattling(true);
            setTimeout(() => setIsRattling(false), 500);
            return;
        }

        setIsSubmitting(true);
        setValidationError(false);
        let imageUrl = null;

        try {
            // 1. Upload Image if exists
            if (uploadFile) {
                // Process image to WebP before uploading
                const processedFile = await processImage(uploadFile);
                
                const fileName = `${Date.now()}-${processedFile.name}`;
                const { error: uploadError } = await supabase.storage
                    .from('stream-images')
                    .upload(fileName, processedFile);

                if (uploadError) throw uploadError;

                const { data: { publicUrl } } = supabase.storage
                    .from('stream-images')
                    .getPublicUrl(fileName);
                
                imageUrl = publicUrl;
            }

            if (editingPostId) {
                // Update existing post
                const updates: any = {
                    title: uploadTitle,
                    content: uploadContent,
                };
                if (imageUrl) updates.image_url = imageUrl;

                const { error: updateError } = await supabase
                    .from('stream_posts')
                    .update(updates)
                    .eq('id', editingPostId);

                if (updateError) throw updateError;
            } else {
                // Insert new post
                const { error: insertError } = await supabase
                    .from('stream_posts')
                    .insert({
                        title: uploadTitle,
                        content: uploadContent, // Storing raw HTML/Text
                        image_url: imageUrl,
                        published: true
                    });

                if (insertError) throw insertError;
            }

            // Reset and refresh
            setUploadTitle('');
            setUploadContent('');
            setUploadFile(null);
            setEditingPostId(null);
            setIsUploading(false);
            fetchPosts();

        } catch (error) {
            console.error('Error uploading post:', error);
            alert('Failed to upload post. Check console.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (postId: string) => {
        if (!confirm('Are you sure you want to delete this post?')) return;
        
        try {
            const { error } = await supabase
                .from('stream_posts')
                .delete()
                .eq('id', postId);

            if (error) throw error;
            
            // If we deleted the current post, adjust index
            if (currentIndex >= posts.length - 1) {
                setCurrentIndex(Math.max(0, posts.length - 2));
            }
            fetchPosts();
            setShowMenu(false);
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };

    const handleEdit = (post: StreamPost) => {
        setUploadTitle(post.title);
        setUploadContent(post.content);
        setEditingPostId(post.id);
        setIsUploading(true);
        setShowMenu(false);
    };

    const handleNext = () => {
        if (currentIndex < posts.length - 1) {
            setCurrentIndex(prev => prev + 1);
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(prev => prev - 1);
        }
    };

    if (!shouldRender) return null;

    const currentPost = posts[currentIndex];

    return (
        <>
            <div 
                className={`stream-overlay ${isExiting ? 'exiting' : ''}`} 
                onClick={onClose}
            />
            <div className={`stream-drawer ${isExiting ? 'exiting' : ''}`}>
                <div className="stream-header">
                    <img src={hsocCta} alt="Editor's Stream" className="stream-logo" />
                    
                    {isAdmin && !isUploading && (
                        <button 
                            className="stream-upload-btn"
                            onClick={() => setIsUploading(true)}
                        >
                            Upload
                        </button>
                    )}

                    {isAdmin && isUploading && (
                        <button 
                            className="stream-upload-btn"
                            onClick={() => {
                                setIsUploading(false);
                                setEditingPostId(null);
                                setUploadTitle('');
                                setUploadContent('');
                                setUploadFile(null);
                                setValidationError(false);
                            }}
                        >
                            Cancel
                        </button>
                    )}

                    <button onClick={onClose} className="stream-close-btn">
                        ✕
                    </button>
                </div>

                <div className="stream-body">
                {isUploading ? (
                    <form className={`stream-upload-form ${isRattling ? 'rattle' : ''}`} onSubmit={handleUpload}>
                        {validationError && (
                            <div className="stream-validation-error">
                                FILL THAT SHIT FIRST
                            </div>
                        )}
                        <div>
                            <label className="stream-label">Title</label>
                            <input 
                                type="text" 
                                className="stream-input"
                                value={uploadTitle}
                                onChange={(e) => setUploadTitle(e.target.value)}
                                placeholder="Enter post title..."
                            />
                        </div>
                        
                        <div>
                            <label className="stream-label">Image</label>
                            <div className="stream-file-upload-wrapper">
                                <input 
                                    type="file" 
                                    id="stream-file-upload"
                                    className="stream-file-input-hidden"
                                    accept="image/*"
                                    onChange={(e) => setUploadFile(e.target.files?.[0] || null)}
                                />
                                <label htmlFor="stream-file-upload" className="stream-file-upload-label">
                                    {uploadFile ? (
                                        <span className="file-selected">
                                            <span className="file-name">{uploadFile.name}</span>
                                            <span className="file-change-text">Change</span>
                                        </span>
                                    ) : (
                                        <span className="file-placeholder">
                                            <span className="file-icon">+</span>
                                            Choose Image
                                        </span>
                                    )}
                                </label>
                            </div>
                            {uploadFile && (
                                <div style={{ marginTop: '8px', fontSize: '10px', color: '#666', fontFamily: 'var(--font-mono)' }}>
                                    Will be compressed to WebP (~1200px width)
                                </div>
                            )}
                        </div>

                        <div>
                            <label className="stream-label">Content (HTML Supported)</label>
                            <textarea 
                                className="stream-input stream-textarea"
                                value={uploadContent}
                                onChange={(e) => setUploadContent(e.target.value)}
                                placeholder="<p>Write your thoughts...</p>"
                            />
                        </div>

                        <button 
                            type="submit" 
                            className="stream-submit-btn"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Publishing...' : (editingPostId ? 'Update Post' : 'Publish Post')}
                        </button>
                    </form>
                ) : (
                    <>
                        {loading ? (
                            <div style={{ color: '#888', textAlign: 'center', marginTop: '40px' }}>
                                Loading stream...
                            </div>
                        ) : currentPost ? (
                            <div className="stream-post">
                                {currentPost.image_url && (
                                    <div className="stream-post-image-container" style={{ position: 'relative' }}>
                                        <img src={currentPost.image_url} alt={currentPost.title} className="stream-post-image" />
                                        
                                        {isAdmin && (
                                            <>
                                                <button 
                                                    className="stream-menu-btn"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setShowMenu(!showMenu);
                                                    }}
                                                >
                                                    <MoreVertical size={16} />
                                                </button>
                                                
                                                {showMenu && (
                                                    <div className="stream-menu-dropdown">
                                                        <button onClick={() => handleEdit(currentPost)}>
                                                            Edit
                                                        </button>
                                                        <button onClick={() => handleDelete(currentPost.id)} className="delete">
                                                            Delete
                                                        </button>
                                                    </div>
                                                )}
                                            </>
                                        )}
                                    </div>
                                )}

                                <div className="stream-post-content">
                                    <div className="stream-post-meta">
                                        {new Date(currentPost.created_at).toLocaleDateString()} • Editor's Stream
                                    </div>
                                    
                                    <h2 className="stream-post-title">
                                        {currentPost.title}
                                    </h2>

                                    <div 
                                        className="stream-post-text-wrapper"
                                        dangerouslySetInnerHTML={{ __html: currentPost.content }}
                                    />
                                </div>
                            </div>
                        ) : (
                            <div style={{ color: '#888', textAlign: 'center', marginTop: '40px' }}>
                                No posts yet.
                            </div>
                        )}
                    </>
                )}
                </div>

                {/* Sticky Footer */}
                {!isUploading && posts.length > 0 && (
                    <div className="stream-footer">
                        <button 
                            className="stream-nav-btn" 
                            onClick={handlePrev}
                            disabled={currentIndex === 0}
                        >
                            ← Previous
                        </button>
                        
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: '#666' }}>
                            {currentIndex + 1} / {posts.length}
                        </span>

                        <button 
                            className="stream-nav-btn" 
                            onClick={handleNext}
                            disabled={currentIndex === posts.length - 1}
                        >
                            Next →
                        </button>
                    </div>
                )}
            </div>
        </>
    );
};
