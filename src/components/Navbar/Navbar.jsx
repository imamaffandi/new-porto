import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <nav className="fixed top-0 left-0 w-full z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo/Brand */}
                    <Link
                        to="/"
                        className="text-mid font-semibold text-2xl"
                    >
                        Imam Affandi
                    </Link>

                    {/* Navigation Links */}
                    <div className="flex space-x-8">
                        <Link
                            to="/projects"
                            className={({ isActive }) =>
                                ` glass w-20 h-5 transition-colors ${isActive ? 'font-medium' : ''
                                }`
                            }
                        >
                            Projects
                        </Link>
                        <Link
                            to="/about"
                            className={({ isActive }) =>
                                ` glass w-20 h-5 transition-colors ${isActive ? 'font-medium' : ''
                                }`
                            }
                        >
                            About
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar