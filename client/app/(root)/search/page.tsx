import React from 'react'

const SearchResult = async ({ searchParams }: { searchParams: Promise<{ query: string }> }) => {
    const query = await searchParams;
    return (
        <div>
            <h1>Search Result</h1>
            <p>Query: {query.query}</p>
        </div>
    )
}

export default SearchResult