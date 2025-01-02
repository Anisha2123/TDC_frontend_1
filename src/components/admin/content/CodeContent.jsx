import ContentLayout from '../layout/ContentLayout';

export default function CodeContent() {
    return (
        <ContentLayout title="Code Content Management">
            <div className="bg-white shadow sm:rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-lg font-medium text-gray-900">
                                Add New Code Content
                            </h3>
                            <form className="mt-5 space-y-4">
                                <div>
                                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                                        Title
                                    </label>
                                    <input
                                        type="text"
                                        name="title"
                                        id="title"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="language" className="block text-sm font-medium text-gray-700">
                                        Programming Language
                                    </label>
                                    <input
                                        type="text"
                                        name="language"
                                        id="language"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        placeholder="e.g., JavaScript, Python, etc."
                                    />
                                </div>
                                <div>
                                    <label htmlFor="code" className="block text-sm font-medium text-gray-700">
                                        Code
                                    </label>
                                    <textarea
                                        name="code"
                                        id="code"
                                        rows={8}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm font-mono"
                                        placeholder="Paste your code here..."
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                >
                                    Save Code Content
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </ContentLayout>
    );
} 