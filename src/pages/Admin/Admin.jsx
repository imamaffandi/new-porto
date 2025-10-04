import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Services from '../../services/services';

const Admin = () => {
    const navigate = useNavigate();
    const [showForm, setShowForm] = useState(false);
    const [projects, setProjects] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        link: '',
        description: '',
        file: null
    });
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        const password = prompt('Please enter admin password:');
        if (password !== 'asdf') {
            alert('Incorrect password!');
            navigate('/');
        } else {
            fetchProjects();
        }
    }, [navigate]);

    const fetchProjects = async () => {
        try {
            const data = await Services.fetchProjects();
            setProjects(data);
        } catch (error) {
            alert('Failed to fetch projects');
        }
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "file" && files && files[0]) {
            setFormData(prev => ({
                ...prev,
                file: URL.createObjectURL(files[0]),
                fileRaw: files[0], // keep the raw file for upload
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                const updatedProject = await Services.updateData({
                    _id: editingId,
                    ...formData
                });
                setProjects(projects.map(project =>
                    project._id === editingId ? updatedProject : project
                ));
            } else {
                const newProject = await Services.addNewData(formData);
                setProjects([...projects, newProject]);
            }
            setShowForm(false);
            setEditingId(null);
            setFormData({ title: '', link: '', description: '', file: null });
        } catch (error) {
            alert(editingId ? 'Failed to update project' : 'Failed to add project');
        }
    };

    const handleEdit = (project) => {
        setFormData({
            title: project.title,
            link: project.link,
            description: project.description,
            file: null
        });
        setEditingId(project._id);
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this project?')) {
            try {
                await Services.deleteData(id);
                setProjects(projects.filter(project => project._id !== id));
            } catch (error) {
                alert('Failed to delete project');
            }
        }
    };

    return (
        <div className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8 z-50">
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-semibold">Project Management</h1>
                    <button
                        onClick={() => {
                            setShowForm(true);
                            setEditingId(null);
                            setFormData({ title: '', link: '', description: '', file: null });
                        }}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                    >
                        Add New Project
                    </button>
                </div>

                {/* Projects List */}
                <div className="bg-white/50 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Link</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {projects.map((project) => (
                                <tr key={project._id}>
                                    <td className="px-6 py-4 whitespace-nowrap">{project.title}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{project.link}</td>
                                    <td className="px-6 py-4 whitespace-nowrap space-x-2">
                                        <button
                                            onClick={() => handleEdit(project)}
                                            className="text-indigo-600 hover:text-indigo-900"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(project._id)}
                                            className="text-red-600 hover:text-red-900"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Form Modal */}
                {showForm && (
                    <div className="fixed inset-0 glass flex items-center justify-center p-4">
                        <div className="bg-white rounded-lg p-8 max-w-2xl w-full">
                            <h2 className="text-2xl font-semibold mb-6">
                                {editingId ? 'Edit Project' : 'Add New Project'}
                            </h2>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="title" className="block text-sm font-medium mb-2">
                                        Title
                                    </label>
                                    <input
                                        type="text"
                                        id="title"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="link" className="block text-sm font-medium mb-2">
                                        Project Link
                                    </label>
                                    <input
                                        type="url"
                                        id="link"
                                        name="link"
                                        value={formData.link}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="description" className="block text-sm font-medium mb-2">
                                        Description
                                    </label>
                                    <textarea
                                        id="description"
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        rows="4"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    ></textarea>
                                </div>

                                <div>
                                    <label htmlFor="file" className="block text-sm font-medium mb-2">
                                        Project Image
                                    </label>
                                    <input
                                        type="file"
                                        id="file"
                                        name="file"
                                        onChange={handleChange}
                                        accept="image/*"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required={!editingId}
                                    />
                                    <img src={formData.file} alt={formData.title} className='object-cover size-20' />
                                </div>

                                <div className="flex space-x-4">
                                    <button
                                        type="submit"
                                        className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                                    >
                                        {editingId ? 'Update Project' : 'Add Project'}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setShowForm(false)}
                                        className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Admin;