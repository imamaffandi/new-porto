import React from 'react'

const Float = () => {
    return (
        <div className='fixed right-0 top-0 z-50 w-72 h-screen p-2 flex flex-col justify-between'>
            <div className='space-y-2'>
                <h1 className='font-head w-full tracking-wider'>Imam Affandi | Creative Developer</h1>
                <p className='w-full text-justify font-body font-semibold text-xs tracking-widest'>Independent creative developer based on Malang, Indonesia. Had more than 4 years experience. Focus in web motion and interactions</p>
            </div>
            <section className='space-y-2'>
                <div className='flex items-start justify-end gap-2'>
                    <a className='text-xs font-body border-b border-b-dark/75' href="">Instagram</a>
                    <a className='text-xs font-body border-b border-b-dark/75' href="">Linkedin</a>
                    <a className='text-xs font-body border-b border-b-dark/75' href="">Github</a>
                </div>
                <a className='text-xl font-bold tracking-widest font-body border-b border-b-dark/75' href="">imamaffandi715@gmail.com</a>
            </section>
        </div>
    )
}

export default Float