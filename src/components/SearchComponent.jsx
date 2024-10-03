import { Search } from "lucide-react";
import React, { useEffect, useState } from "react";

const SearchComponent = ({onSearch, placeholder="search.."}) => {
	const [searchVal, setSearchVal] = useState("");
    const [debounceSearch, setDebounceSearch] = useState(searchVal);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebounceSearch(searchVal);
        }, 300);
        return () => {
            clearTimeout(handler);
        }
    }, [searchVal]);
    useEffect(() => {
        if(debounceSearch) {
            onSearch(debounceSearch);
        }
    }, [debounceSearch, onSearch]);
    
	return (
		<div className="flex items-center bg-white bg-opacity-20 rounded-full px-3 py-1">
			<input
				type="text"
				value={searchVal}
				onChange={(e) => setSearchVal(e.target.value)}
				className="bg-transparent text-white placeholder-white outline-none"
			/>
			<Search className="text-white ml-2" size={20} />
		</div>
	);
};

export default SearchComponent;
