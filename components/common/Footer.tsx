import Link from "next/link"

export function Footer() {
    return (
        <footer className="border-t border-purple-500/20 bg-gradient-to-b from-transparent to-gray-900/10 backdrop-blur-lg">
            <div className="container flex flex-col items-center justify-between gap-6 py-12 md:flex-row md:py-8">
                <div className="flex flex-col items-center md:items-start">
                    <p className="text-sm font-medium text-gray-300">
                        <span className="opacity-80">Crafted with </span>
                        <span className="text-red-500">❤️</span>
                        <span className="opacity-80"> by </span>
                        <Link
                            href="https://github.com/zenpai6996"
                            target="_blank"
                            rel="noreferrer"
                            className="font-semibold text-purple-400 transition-colors hover:text-purple-300"
                        >
                            Souharda Roy Barman
                        </Link>
                    </p>
                    <p className="mt-1 text-xs text-gray-400">© {new Date().getFullYear()} • All rights reserved</p>
                </div>

                <div className="flex items-center gap-4">
                    <SocialIcon href="https://www.linkedin.com/in/souharda-roy-barman-02a835343?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" icon="linkedin" label="LinkedIn" />
                    <SocialIcon href="https://github.com/zenpai6996" icon="github" label="GitHub" />
                    <SocialIcon href="https://instagram.com/srbii._" icon="instagram" label="Instagram" />
                </div>
            </div>
        </footer>
    )
}

function SocialIcon({ href, icon, label }) {
    const iconSvg = {
        linkedin: (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24" className="h-5 w-5">
                <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"></path>
            </svg>
        ),
        github: (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24" className="h-5 w-5">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.605-3.369-1.343-3.369-1.343-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.268 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.026 2.747-1.026.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.933.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12c0-5.523-4.477-10-10-10z"></path>
            </svg>
        ),
        instagram: (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24" className="h-5 w-5">
                <path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153a4.908 4.908 0 011.153 1.772c.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 01-1.153 1.772 4.915 4.915 0 01-1.772 1.153c-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 01-1.772-1.153 4.904 4.904 0 01-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 011.153-1.772A4.897 4.897 0 015.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 1.802c-2.67 0-2.986.01-4.04.059-.976.045-1.505.207-1.858.344-.466.182-.8.398-1.15.748-.35.35-.566.684-.748 1.15-.137.353-.3.882-.344 1.857-.048 1.055-.058 1.37-.058 4.041 0 2.67.01 2.986.058 4.04.044.976.207 1.504.344 1.857.182.466.398.8.748 1.15.35.35.684.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058 2.67 0 2.987-.01 4.04-.058.976-.044 1.504-.207 1.857-.344.466-.182.8-.398 1.15-.748.35-.35.566-.684.748-1.15.137-.353.3-.882.344-1.857.048-1.054.058-1.37.058-4.04 0-2.67-.01-2.986-.058-4.041-.044-.976-.207-1.504-.344-1.857a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.881-.3-1.857-.344-1.054-.048-1.37-.058-4.04-.058zm0 3.063a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 8.468a3.333 3.333 0 100-6.666 3.333 3.333 0 000 6.666zm6.538-8.684a1.2 1.2 0 11-2.4 0 1.2 1.2 0 012.4 0z"></path>
            </svg>
        )
    };

    const hoverColors = {
        linkedin: "hover:bg-blue-600",
        github: "hover:bg-gray-800",
        instagram: "hover:bg-pink-600"
    };

    return (
        <Link
            href={href}
            aria-label={label}
            className={`flex h-10 w-10 items-center justify-center rounded-full bg-gray-800/40 text-gray-300 transition-all ${hoverColors[icon]} hover:text-white hover:shadow-lg hover:scale-110`}
            target="_blank"
            rel="noreferrer"
        >
            {iconSvg[icon]}
            <span className="sr-only">{label}</span>
        </Link>
    )
}