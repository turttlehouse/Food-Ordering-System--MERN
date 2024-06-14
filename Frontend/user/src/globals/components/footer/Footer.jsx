
const Footer = () => {
    return (
     
        <footer className="mt-20 font-sans bg-yellow-50 dark:bg-gray-900">
        <div className="container px-6 py-12 mx-auto">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-y-10 lg:grid-cols-4">
                <div className="sm:col-span-2">
                    <h1 className="max-w-lg text-xl font-semibold tracking-tight text-gray-800 xl:text-2xl dark:text-white">Be the First to Know About Our Deals and Offers!</h1>
                    <div className="flex flex-col mx-auto mt-6 space-y-3 md:space-y-0 md:flex-row">
                        <input id="email" type="email" className="px-4 py-2 text-gray-700 bg-white border rounded-md dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 focus:ring-blue-300" placeholder="Email Address" />
                        <button className="w-full px-6 py-2.5 text-sm font-medium tracking-wider text-white transition-colors duration-300 transform md:w-auto md:mx-4 focus:outline-none bg-gray-800 rounded-lg hover:bg-gray-700 focus:ring focus:ring-gray-300 focus:ring-opacity-80">Subscribe</button>
                    </div>
                </div>
                <div>
                    <p className="font-semibold text-gray-800 dark:text-white">Quick Links</p>
                    <div className="flex flex-col items-start mt-5 space-y-2">
                        <a href="/" className="text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:text-blue-500">Home</a>
                        <a href="/" className="text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:text-blue-500">Menu</a>
                        <a href="/" className="text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:text-blue-500">About Us</a>
                        <a href="/" className="text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:text-blue-500">Contact Us</a>
                        <a href="/" className="text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:text-blue-500">FAQ</a>
                    </div>
                </div>
                <div>
                    <p className="font-semibold text-gray-800 dark:text-white">Legal</p>
                    <div className="flex flex-col items-start mt-5 space-y-2">
                        <a href="/" className="text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:text-blue-500">Privacy Policy</a>
                        <a href="/" className="text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:text-blue-500">Terms and Conditions</a>
                        <a href="/" className="text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:text-blue-500">Refund Policy</a>
                    </div>
                </div>
            </div>
            <hr className="h-2 my-6 border-gray-200 md:my-8 dark:border-gray-700" />
            <div className="sm:flex sm:items-center sm:justify-between">
                <div className="flex gap-4 hover:cursor-pointer">
                    <a href="https://www.facebook.com/vishal.jimee" target="_blank"><img src="https://www.svgrepo.com/show/303114/facebook-3-logo.svg" width="30" height="30" alt="Facebook" /></a>
                    <a href="https://x.com/jimee0007?mx=2" target="_blank"><img src="https://www.svgrepo.com/show/303115/twitter-3-logo.svg" width="30" height="30" alt="Twitter" /></a>
                    <a href="#"><img src="https://www.svgrepo.com/show/303145/instagram-2-1-logo.svg" width="30" height="30" alt="Instagram" /></a>
                    <a href="https://www.linkedin.com/in/bishal-yakkha-77990526b/" target="_blank"><img src="https://www.svgrepo.com/show/28145/linkedin.svg" width="30" height="30" alt="LinkedIn" /></a>
                </div>
            </div>
            <p className="mt-8 text-center text-gray-600 dark:text-gray-300">© 2024 Burger House. All rights reserved.</p>
        </div>
    </footer>
    
    )
  }
  
  export default Footer