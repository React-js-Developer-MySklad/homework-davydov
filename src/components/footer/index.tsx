
import './index.module.css';
import React from 'react'

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white rounded-lg shadow m-4 dark:bg-gray-800">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
      <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2007-2024 <a href="https://flowbite.com/" className="hover:underline">ООО "Логнекс"</a>
      </span>
      </div>
  </footer>
  )
}