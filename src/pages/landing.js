import { useState, Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import { ChevronRightIcon, StarIcon, CheckCircleIcon } from '@heroicons/react/solid'
import HeroImage from '../img/hero-image.png'
import { supabase } from '../supabaseClient'


const navigation = [
    { name: 'Product', href: '#' },
    { name: 'Features', href: '#' },
    { name: 'Marketplace', href: '#' },
    { name: 'Company', href: '#' },
]

const Landing = () => (
    <div className="min-h-screen">
        <Hero />
        {/* <AboutUs /> */}
    </div>

);

const stats = [
    { label: 'Founded', value: '2021' },
    { label: 'Employees', value: '5' },
    { label: 'Beta Users', value: '521' },
    { label: 'Raised', value: '$25M' },
]


function Hero() {
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    async function addEmail({ email }) {
        try {
            setLoading(true)
            let { data } = await supabase.from('email_list').select('email').eq('email', `${email}`)
            if (!data.length > 0) {
                const info = {
                    email,
                    added_at: new Date(),
                }
                let { error } = await supabase.from('email_list').insert(info, {
                    returning: 'minimal',
                })
                if (error) {
                    throw error
                }
            }
        } catch (error) {
            console.log(error.message)
        } finally {
            setTimeout(() => { setLoading(false) }, 2000);
            setTimeout(() => { setSuccess(true); setEmail('') }, 2000);
        }
    }
    return (
        <div className="relative bg-white overflow-hidden">
            <div className="hidden lg:block lg:absolute lg:inset-0" aria-hidden="true">
                <svg
                    className="absolute top-0 left-1/2 transform translate-x-64 -translate-y-8"
                    width={640}
                    height={784}
                    fill="none"
                    viewBox="0 0 640 784"
                >
                    <defs>
                        <pattern
                            id="9ebea6f4-a1f5-4d96-8c4e-4c2abf658047"
                            x={118}
                            y={0}
                            width={20}
                            height={20}
                            patternUnits="userSpaceOnUse"
                        >
                            <rect x={0} y={0} width={4} height={4} className="text-gray-200" fill="currentColor" />
                        </pattern>
                    </defs>
                    <rect y={72} width={640} height={640} className="text-gray-50" fill="currentColor" />
                    <rect x={118} width={404} height={784} fill="url(#9ebea6f4-a1f5-4d96-8c4e-4c2abf658047)" />
                </svg>
            </div>

            <div className="relative pt-6 pb-6 sm:pb-24 lg:pb-6">
                <main className="mt-16 mx-auto max-w-7xl px-4 sm:mt-24 sm:px-6 lg:mt-32">
                    <div className="lg:grid lg:grid-cols-12 lg:gap-8">
                        <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
                            <h1>
                                <span className="block text-sm font-semibold uppercase tracking-wide text-black-600 sm:text-base lg:text-sm xl:text-base">
                                    Coming soon
                                </span>
                                <span className="mt-5 block text-4xl tracking-tight font-extrabold sm:text-5xl xl:text-7xl">
                                    <span className="text-red-600">Martin Wu</span>
                                    <span className="text-black-600"> Eats</span>
                                </span>
                            </h1>
                            <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                                Join Martin as he explores the diverse world of Bay Area food and culture. Martin Wu Eats is the platform for food lovers to discover new restaurants, dishes, and cuisines: your guide to the best places in town.
                            </p>
                            <div className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left lg:mx-0">
                                <p className="text-base font-medium text-black-600">Sign up to be notified when we're ready.</p>
                                <div className="mt-3 sm:flex">
                                    <label htmlFor="email" className="sr-only">
                                        Email
                                    </label>
                                    <input
                                        id="hero-email"
                                        type="email"
                                        className="block w-full border border-gray-300 rounded-md px-5 py-3 text-base text-gray-900 placeholder-gray-500 shadow-sm focus:border-mainRed focus:ring-mainRed"
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}

                                    />
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        onClick={() => addEmail({ email })}
                                        className="mt-3 w-full px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-red-600 shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:flex-shrink-0 sm:inline-flex sm:items-center sm:w-auto"
                                    >
                                        {loading && <svg
                                            class="animate-spin mr-3 h-5 w-5text-white"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <circle
                                                class="opacity-25"
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                stroke-width="4"
                                            />
                                            <path
                                                class="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                            />
                                        </svg>}
                                        Notify me
                                    </button>

                                </div>
                                {success && <div className="mt-3">
                                    <div className="rounded-md bg-green-50 p-4">
                                        <div className="flex">
                                            <div className="flex-shrink-0">
                                                <CheckCircleIcon className="h-5 w-5 text-green-400" aria-hidden="true" />
                                            </div>
                                            <div className="ml-3">
                                                <h3 className="text-sm font-medium text-green-800">Email Succesfully Added</h3>
                                            </div>
                                        </div>
                                    </div>
                                </div>}
                                <p className="mt-3 text-sm text-red-600">
                                    Spam sucks, both the pork & email kind. We promise to not send you any of it.
                                </p>
                            </div>
                        </div>
                        <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
                            <svg
                                className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-8 scale-75 origin-top sm:scale-100 lg:hidden"
                                width={640}
                                height={784}
                                fill="none"
                                viewBox="0 0 640 784"
                                aria-hidden="true"
                            >
                                <defs>
                                    <pattern
                                        id="4f4f415c-a0e9-44c2-9601-6ded5a34a13e"
                                        x={118}
                                        y={0}
                                        width={20}
                                        height={20}
                                        patternUnits="userSpaceOnUse"
                                    >
                                        <rect x={0} y={0} width={4} height={4} className="text-gray-200" fill="currentColor" />
                                    </pattern>
                                </defs>
                                <rect y={72} width={640} height={640} className="text-gray-50" fill="currentColor" />
                                <rect x={118} width={404} height={784} fill="url(#4f4f415c-a0e9-44c2-9601-6ded5a34a13e)" />
                            </svg>
                            <div className="relative mx-auto w-full rounded-lg shadow-lg lg:max-w-lg">
                                <div
                                    className="relative block w-full bg-white rounded-lg overflow-hidden focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    <img
                                        className="w-full"
                                        src={HeroImage}
                                        alt=""
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}

function AboutUs() {
    return (
        <div className="relative mt-20">
            <div className="lg:mx-auto lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:gap-24 lg:items-start">
                <div className="relative sm:py-16 lg:py-0">
                    <div aria-hidden="true" className="hidden sm:block lg:absolute lg:inset-y-0 lg:right-0 lg:w-screen">
                        <div className="absolute inset-y-0 right-1/2 w-full bg-gray-50 rounded-r-3xl lg:right-72" />
                        <svg
                            className="absolute top-8 left-1/2 -ml-3 lg:-right-8 lg:left-auto lg:top-12"
                            width={404}
                            height={392}
                            fill="none"
                            viewBox="0 0 404 392"
                        >
                            <defs>
                                <pattern
                                    id="02f20b47-fd69-4224-a62a-4c9de5c763f7"
                                    x={0}
                                    y={0}
                                    width={20}
                                    height={20}
                                    patternUnits="userSpaceOnUse"
                                >
                                    <rect x={0} y={0} width={4} height={4} className="text-gray-200" fill="currentColor" />
                                </pattern>
                            </defs>
                            <rect width={404} height={392} fill="url(#02f20b47-fd69-4224-a62a-4c9de5c763f7)" />
                        </svg>
                    </div>
                    <div className="relative mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-0 lg:max-w-none lg:py-20">
                        {/* Testimonial card*/}
                        <div className="relative pt-64 pb-10 rounded-2xl shadow-xl overflow-hidden">
                            <img
                                className="absolute inset-0 h-full w-full object-cover"
                                src="https://images.unsplash.com/photo-1521510895919-46920266ddb3?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&fp-x=0.5&fp-y=0.6&fp-z=3&width=1440&height=1440&sat=-100"
                                alt=""
                            />
                            <div className="absolute inset-0 bg-rose-500 mix-blend-multiply" />
                            <div className="absolute inset-0 bg-gradient-to-t from-rose-600 via-rose-600 opacity-90" />
                            <div className="relative px-8">
                                <div>
                                    <img
                                        className="h-12"
                                        src="https://tailwindui.com/img/logos/workcation.svg?color=white"
                                        alt="Workcation"
                                    />
                                </div>
                                <blockquote className="mt-8">
                                    <div className="relative text-lg font-medium text-white md:flex-grow">
                                        <svg
                                            className="absolute top-0 left-0 transform -translate-x-3 -translate-y-2 h-8 w-8 text-rose-400"
                                            fill="currentColor"
                                            viewBox="0 0 32 32"
                                            aria-hidden="true"
                                        >
                                            <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                                        </svg>
                                        <p className="relative">
                                            Tincidunt integer commodo, cursus etiam aliquam neque, et. Consectetur pretium in volutpat,
                                            diam. Montes, magna cursus nulla feugiat dignissim id lobortis amet.
                                        </p>
                                    </div>

                                    <footer className="mt-4">
                                        <p className="text-base font-semibold text-rose-200">Sarah Williams, CEO at Workcation</p>
                                    </footer>
                                </blockquote>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="relative mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-0">
                    {/* Content area */}
                    <div className="pt-12 sm:pt-16 lg:pt-20">
                        <h2 className="text-3xl text-gray-900 font-extrabold tracking-tight sm:text-4xl">
                            On a mission to empower teams
                        </h2>
                        <div className="mt-6 text-gray-500 space-y-6">
                            <p className="text-lg">
                                Sagittis scelerisque nulla cursus in enim consectetur quam. Dictum urna sed consectetur neque
                                tristique pellentesque. Blandit amet, sed aenean erat arcu morbi. Cursus faucibus nunc nisl netus
                                morbi vel porttitor vitae ut. Amet vitae fames senectus vitae.
                            </p>
                            <p className="text-base leading-7">
                                Sollicitudin tristique eros erat odio sed vitae, consequat turpis elementum. Lorem nibh vel, eget
                                pretium arcu vitae. Eros eu viverra donec ut volutpat donec laoreet quam urna. Sollicitudin
                                tristique eros erat odio sed vitae, consequat turpis elementum. Lorem nibh vel, eget pretium arcu
                                vitae. Eros eu viverra donec ut volutpat donec laoreet quam urna.
                            </p>
                            <p className="text-base leading-7">
                                Rhoncus nisl, libero egestas diam fermentum dui. At quis tincidunt vel ultricies. Vulputate aliquet
                                velit faucibus semper. Pellentesque in venenatis vestibulum consectetur nibh id. In id ut tempus
                                egestas. Enim sit aliquam nec, a. Morbi enim fermentum lacus in. Viverra.
                            </p>
                        </div>
                    </div>

                    {/* Stats section */}
                    <div className="mt-10">
                        <dl className="grid grid-cols-2 gap-x-4 gap-y-8">
                            {stats.map((stat) => (
                                <div key={stat.label} className="border-t-2 border-gray-100 pt-6">
                                    <dt className="text-base font-medium text-gray-500">{stat.label}</dt>
                                    <dd className="text-3xl font-extrabold tracking-tight text-gray-900">{stat.value}</dd>
                                </div>
                            ))}
                        </dl>
                        <div className="mt-10">
                            <a href="#" className="text-base font-medium text-rose-500">
                                Learn more about how we're changing the world&nbsp&rarr;
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Landing;