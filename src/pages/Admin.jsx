import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { projectAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';

const Admin = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    // Projects
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    // Modal / form
    const [showprojectForm, setShowprojectForm] = useState(false);
    const [submittingproject, setSubmittingproject] = useState(false);
    const [deletingproject, setDeletingproject] = useState({});

    // Form data for create / edit
    const [projectFormData, setProjectFormData] = useState({
        _id: null,
        name: '',
        description: '',
        link: '',
        images: [] // array of base64 strings or image URLs
    });

    // Single image preview (UI expects a single project image)
    const [projectImagePreview, setProjectImagePreview] = useState(null);

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            setLoading(true);
            const data = await projectAPI.getAll();
            // normalize: ensure fields exist
            const normalized = (data || []).map(p => ({
                _id: p._id || p.id || p._id,
                name: p.name || p.title || '',
                description: p.description || '',
                link: p.link || '',
                images: p.images || [],
                createdAt: p.createdAt || p.created_at || null
            }));
            setProjects(normalized);
        } catch (err) {
            console.error('Error fetching projects:', err);
            alert('Failed to load projects');
        } finally {
            setLoading(false);
        }
    };

    // Convert file to base64. Used for preview and inline upload.
    const fileToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (err) => reject(err);
        });
    };

    const handleprojectFileInput = async (e) => {
        const file = e.target.files && e.target.files[0];
        if (!file) return;
        if (!file.type.startsWith('image/')) return alert('Please select an image file');

        try {
            const base64 = await fileToBase64(file);
            setProjectFormData(prev => ({ ...prev, images: [base64] }));
            setProjectImagePreview({ src: base64, name: file.name });
        } catch (err) {
            console.error('Error reading image:', err);
            alert('Failed to read image');
        }
    };

    const removeprojectImage = () => {
        setProjectFormData(prev => ({ ...prev, images: [] }));
        setProjectImagePreview(null);
        // clear file input if present
        const input = document.getElementById('project-image-input');
        if (input) input.value = '';
    };

    const handleprojectInputChange = (e) => {
        const { name, value } = e.target;
        setProjectFormData(prev => ({ ...prev, [name]: value }));
    };

    const resetprojectForm = () => {
        setProjectFormData({ _id: null, name: '', description: '', link: '', images: [] });
        setProjectImagePreview(null);
        setSubmittingproject(false);
        setShowprojectForm(false);
        // clear file input
        const input = document.getElementById('project-image-input');
        if (input) input.value = '';
    };

    const handleprojectSubmit = async (e) => {
        e.preventDefault();
        setSubmittingproject(true);

        try {
            const payload = {
                name: projectFormData.name,
                description: projectFormData.description,
                link: projectFormData.link,
                images: projectFormData.images || []
            };

            if (projectFormData._id) {
                await projectAPI.update(projectFormData._id, payload);
                alert('Project updated successfully!');
            } else {
                await projectAPI.create(payload);
                alert('Project created successfully!');
            }

            // If backend expects multipart upload for images you'd call uploadImages here.
            // We chose to send base64 in `images` to keep API usage consistent with api.js create/update.

            resetprojectForm();
            fetchProjects();
        } catch (err) {
            console.error('Error saving project:', err);
            alert('Failed to save project');
        } finally {
            setSubmittingproject(false);
        }
    };

    const handleEdit = (project) => {
        setProjectFormData({
            _id: project._id,
            name: project.name || '',
            description: project.description || '',
            link: project.link || '',
            images: project.images || []
        });

        if (project.images && project.images.length > 0) {
            setProjectImagePreview({ src: project.images[0], name: 'Image 1' });
        } else {
            setProjectImagePreview(null);
        }

        setShowprojectForm(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this project?')) return;
        try {
            setDeletingproject(prev => ({ ...prev, [id]: true }));
            await projectAPI.delete(id);
            alert('Project deleted successfully!');
            fetchProjects();
        } catch (err) {
            console.error('Error deleting project:', err);
            alert('Failed to delete project');
        } finally {
            setDeletingproject(prev => ({ ...prev, [id]: false }));
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#000000" className="size-6 animate-spin">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                </svg>
            </div>
        );
    }

    return (
        <div className="bg-neutral-50 min-h-screen w-full font-body text-neutral-800">
            {/* Header */}
            <header className="sticky top-0 left-0 w-full bg-white/80 backdrop-blur-md shadow-sm z-10 border-b border-neutral-200">
                <div className="w-full px-4 md:px-8 py-4 md:py-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0">
                    <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-neutral-900">Admin</h1>
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
                        <button
                            onClick={() => setShowprojectForm(true)}
                            className="px-4 md:px-6 py-2 md:py-3 rounded-lg bg-neutral-900 text-white text-sm md:text-base font-medium hover:bg-neutral-700 transition-all shadow-md active:scale-95"
                        >
                            + Add Project
                        </button>
                        <button
                            onClick={() => {
                                logout();
                                navigate('/login');
                            }}
                            className="px-4 md:px-6 py-2 md:py-3 rounded-lg bg-red-600 text-white text-sm md:text-base font-medium hover:bg-red-700 transition-all shadow-md active:scale-95"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 md:px-6 py-6 md:py-10 space-y-6 md:space-y-10">
                {/* Project List */}
                <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 overflow-hidden">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0 p-4 md:p-6 border-b border-neutral-100">
                        <h2 className="text-xl md:text-2xl font-semibold text-neutral-900">Projects List</h2>
                        <p className="text-xs md:text-sm text-neutral-500">{projects.length} {projects.length === 1 ? 'post' : 'posts'}</p>
                    </div>

                    {projects.length === 0 ? (
                        <div className="p-8 md:p-12 text-center text-neutral-500 text-sm md:text-base">No projects found. Create your first one!</div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse min-w-[640px]">
                                <thead className="bg-neutral-100 text-neutral-600">
                                    <tr>
                                        {['Name', 'Description', 'Link', 'Actions'].map((h) => (
                                            <th key={h} className="px-3 md:px-6 py-2 md:py-3 text-left text-xs font-semibold uppercase tracking-wider border-b border-neutral-200">{h}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-neutral-100">
                                    {projects.map(project => (
                                        <tr key={project._id} className="hover:bg-neutral-50 transition-all">
                                            <td className="px-3 md:px-6 py-3 md:py-4 text-sm md:text-base font-medium max-w-xs truncate flex items-center gap-3">
                                                {project.images && project.images.length > 0 ? (
                                                    <img src={project.images[0]} alt={project.name} className="w-12 h-12 md:w-16 md:h-16 object-cover rounded-lg" />
                                                ) : (
                                                    <div className="w-12 h-12 md:w-16 md:h-16 bg-neutral-200 rounded-lg flex items-center justify-center text-neutral-400 text-xs">No Image</div>
                                                )}
                                                <div className="truncate">{project.name}</div>
                                            </td>

                                            <td className="px-3 md:px-6 py-3 md:py-4 text-sm text-neutral-600 max-w-md truncate">{project.description}</td>

                                            <td className="px-3 md:px-6 py-3 md:py-4 text-xs md:text-sm text-neutral-500">
                                                {project.link ? (
                                                    <a href={project.link} target="_blank" rel="noreferrer" className="underline">Open</a>
                                                ) : '—'}
                                            </td>

                                            <td className="px-3 md:px-6 py-3 md:py-4 text-xs md:text-sm font-medium">
                                                <div className="flex items-center gap-3">
                                                    <button onClick={() => handleEdit(project)} className="text-neutral-800 hover:text-neutral-900">Edit</button>

                                                    <button
                                                        onClick={() => handleDelete(project._id)}
                                                        disabled={!!deletingproject[project._id]}
                                                        className="text-red-600 hover:text-red-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                                                    >
                                                        {deletingproject[project._id] ? (
                                                            <>
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#000000" className="size-4 animate-spin">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                                                                </svg>
                                                                <span className="hidden sm:inline">Deleting...</span>
                                                            </>
                                                        ) : (
                                                            'Delete'
                                                        )}
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </main>

            {/* project MODAL FORM */}
            {showprojectForm && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 p-2 md:p-4">
                    <div className="bg-white/90 backdrop-blur-md border border-neutral-200 rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto p-4 md:p-6 lg:p-8 relative">
                        <button onClick={resetprojectForm} className="absolute top-3 md:top-4 right-3 md:right-4 text-neutral-500 hover:text-neutral-800 text-xl md:text-2xl">×</button>
                        <h2 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6 text-neutral-900 pr-8">{projectFormData._id ? 'Edit Project' : 'Create New project'}</h2>

                        <form onSubmit={handleprojectSubmit} className="space-y-4 md:space-y-6">
                            <div>
                                <label className="text-sm font-medium text-neutral-700 mb-2 ">Name *</label>
                                <input type="text" name="name" value={projectFormData.name} onChange={handleprojectInputChange} required className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 outline-none" placeholder="Enter project name" />
                            </div>

                            <div>
                                <label className="text-sm font-medium text-neutral-700 mb-2 ">Description *</label>
                                <input type="text" name="description" value={projectFormData.description} onChange={handleprojectInputChange} required className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 outline-none" placeholder="Enter project description" />
                            </div>

                            <div>
                                <label className="text-sm font-medium text-neutral-700 mb-2 ">Link *</label>
                                <input type="text" name="link" value={projectFormData.link} onChange={handleprojectInputChange} required className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 outline-none" placeholder="Enter project link" />
                            </div>

                            <div>
                                <label className="text-sm font-medium text-neutral-700 mb-3 ">project Image</label>
                                <input id="project-image-input" type="file" accept="image/*" onChange={handleprojectFileInput} className="w-full text-sm text-neutral-700 border border-neutral-300 rounded-lg cursor-pointer focus:ring-2 focus:ring-neutral-900 focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-neutral-900 file:text-white hover:file:bg-neutral-700" />

                                {projectImagePreview && (
                                    <div className="mt-4">
                                        <div className="relative w-full h-48 md:h-72 border border-neutral-200 rounded-xl overflow-hidden flex items-center justify-center bg-neutral-100">
                                            <img src={projectImagePreview.src} alt="project preview" className="object-cover w-full h-full" />
                                            <button type="button" onClick={removeprojectImage} className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 text-sm font-semibold hover:bg-red-600 transition-colors shadow-lg" title="Delete image">✕</button>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="flex flex-col sm:flex-row justify-end gap-3 md:gap-4 pt-4 md:pt-6">
                                <button type="button" onClick={resetprojectForm} disabled={submittingproject} className="px-4 md:px-6 py-2 rounded-lg border border-neutral-300 hover:bg-neutral-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base">Cancel</button>
                                <button type="submit" disabled={submittingproject} className="px-4 md:px-6 py-2 rounded-lg bg-neutral-900 text-white hover:bg-neutral-700 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 min-w-[140px] justify-center text-sm md:text-base">
                                    {submittingproject ? (
                                        <>
                                            <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                                            Saving...
                                        </>
                                    ) : (
                                        projectFormData._id ? 'Update project' : 'Create project'
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Admin;
