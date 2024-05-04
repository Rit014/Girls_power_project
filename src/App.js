import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';

function App() {
    const [users, setUsers] = useState([]);
    const [searchData, setSearchData] = useState([]);
    const [filterValue, setFilterValue] = useState('');

    const columns = [
        {
            name: 'ID',
            selector: row => row.id,
            sortable: true
        },
        {
            name: "Name",
            selector: row => row.name,
            sortable: true
        },
        {
            name: "Rank",
            selector: row => row.rank,
            sortable: true
        },
        {
            name: "Price (USD)",
            selector: row => row.price_usd,
            sortable: true
        },
        {
            name: "Percent Change (24h)",
            selector: row => row.percent_change_24h,
            sortable: true
        },
        {
            name: "Price (BTC)",
            selector: row => row.price_btc,
            sortable: true
        },
        {
            name: "Market Cap (USD)",
            sortable: true,
            selector: row => row.market_cap_usd
        }

    ]

    const fetchData = async () => {
        try {
            const data = await fetch("https://api.coinlore.net/api/tickers/")
            const response = await data.json();
            const userData = await response.data;
            if (userData.length > 0) {
                setUsers(userData);
                setSearchData(userData);
            }
            console.log(userData);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchData();
    }, [])

    const handleFilter = (e) => {
        if (e.target.value === "") {
            setUsers(searchData)
        } else {
            const filterResult = searchData.filter(item => item.name.toLowerCase().includes(e.target.value.toLowerCase()) || item.id.toLowerCase().includes(e.target.value.toLowerCase()) || item.rank.toLowerCase().includes(e.target.value.toLowerCase()) || item.price_usd.toLowerCase().includes(e.target.value.toLowerCase()) || item.percent_change_24h.toLowerCase().includes(e.target.value.toLowerCase()) || item.price_btc.toLowerCase().includes(e.target.value.toLowerCase()) || item.market_cap_usd.toLowerCase().includes(e.target.value.toLowerCase()));
            if (filterResult.length > 0) {
                setUsers(filterResult)
            } else {
                setUsers([{ 
                    "id": "No Data Found", 
                    "name": "no Data found",
                    "rank": "no Data found",
                    "price_usd": "no Data found",
                    "percent_change_24h": "no Data found",
                    "price_btc": "no Data found",
                    "market_cap_usd": "no Data found"
                }]);
            }
        }
        setFilterValue(e.target.value)
    }

    return (
        <>
            <div className='container'>
                <h2 className='Headline'>User Data Table</h2>
                <input type="search"
                    className='input-field'
                    placeholder="Search"
                    value={filterValue}
                    onChange={(e) => handleFilter(e)}
                />
            </div>
            <DataTable columns={columns}
                data={users}
                selectableRows
                fixedHeader
                pagination
            />
        </>
    )
}

export default App
