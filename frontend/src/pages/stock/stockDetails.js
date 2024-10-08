import React, { useEffect, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";
import "./../../style/stock/StockDetails.css";

function StockDetails() {
    const [items, setItems] = useState([]);
    const [search, setSearch] = useState("");

    // Fetch data from both collections
    useEffect(() => {
        const fetchData = async () => {
            try {
                
                const [assignItemsRes, restocksRes] = await Promise.all([
                    axios.get("http://localhost:8070/assign_items/all"),
                    axios.get("http://localhost:8070/restock/all")
                ]);

                // Format assigned items data
                const assignItemsData = assignItemsRes.data.map((item) => ({
                    itemName: item.itemName,
                    quantity: item.quantity,
                    date: item.assignDate,
                    status: "Assigned"
                }));

                // Format restocks data
                const restocksData = restocksRes.data.map((item) => ({
                    itemName: item.itemName,
                    quantity: item.quantity,
                    date: item.purchaseDate,
                    status: "Restocked"
                }));

                
                const combinedData = [...assignItemsData, ...restocksData].sort(
                    (a, b) => new Date(a.date) - new Date(b.date)
                );

                setItems(combinedData);
            } catch (err) {
                console.error(err.message);
            }
        };

        fetchData();
    }, []);

    // Filtered items based on the search term
    const filteredItems = items.filter((item) => {
        if (search === "") return item;
        return item.itemName.toLowerCase().includes(search.toLowerCase());
    });

    // Generate PDF report with filtered data
    const generateReport = () => {
        const doc = new jsPDF();
        
        // Add title to PDF
        doc.text("Stock Details Report", 14, 20);

        // Generate the table for PDF
        doc.autoTable({
            startY: 30,
            head: [['Item Name', 'Quantity', 'Date', 'Status']],
            body: filteredItems.map(item => [
                item.itemName,
                item.quantity,
                new Date(item.date).toLocaleDateString(),
                item.status
            ]),
        });

        // Save the PDF
        doc.save("stock-details-report.pdf");
    };

    return (
        <div className="stock-details-container">
            <h1 className="sdtitle">Stock Details</h1>

            <div className="actions-container">
                <div className="search-bar-container">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by item name"
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <button className="generate-report-button" onClick={generateReport}>
                    Generate Report
                </button>
            </div>

            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">Item Name</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Date</th>
                        <th scope="col">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredItems.map((item, index) => (
                        <tr key={index}>
                            <td>{item.itemName}</td>
                            <td>{item.quantity}</td>
                            <td>{new Date(item.date).toLocaleDateString()}</td>
                            <td>{item.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="pagination">
                <button>Previous</button>
                <button>1</button>
                <button>2</button>
                <button>Next</button>
            </div>
        </div>
    );
}

export default StockDetails;
