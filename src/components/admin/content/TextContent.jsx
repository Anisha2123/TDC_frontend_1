import ContentLayout from '../layout/ContentLayout';

export default function TextContent() {
    return (
        <ContentLayout title="Text Content Management">
            <div className="bg-white shadow sm:rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                    {/* Add your content management form/interface here */}
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-lg font-medium text-gray-900">
                                Add New Text Content
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
                                    <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                                        Content
                                    </label>
                                    <textarea
                                        name="content"
                                        id="content"
                                        rows={4}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                >
                                    Save Content
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </ContentLayout>
    );
} 