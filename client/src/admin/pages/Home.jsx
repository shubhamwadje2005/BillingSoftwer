// import React, { useState } from 'react';
// import { useGetBillsQuery } from '../../redux/api/bill.api';

// const DashboardHome = () => {
//     const { data } = useGetBillsQuery()
//     const today = new Date();
//     const [selectedYear, setSelectedYear] = useState(today.getFullYear().toString());
//     const [selectedMonth, setSelectedMonth] = useState(today.toLocaleString('default', { month: 'long' }));
//     const [selectedDay, setSelectedDay] = useState(today.getDate().toString().padStart(2, '0'));

//     // सर्व डेटा जनरेट करणे
//     const years = [];
//     for (let i = 2020; i <= 2030; i++) years.push(i.toString());

//     const months = [
//         "January", "February", "March", "April", "May", "June",
//         "July", "August", "September", "October", "November", "December"
//     ];

//     const days = [];
//     for (let i = 1; i <= 31; i++) days.push(i.toString().padStart(2, '0'));

//     // १. लाइफ-टाइम डेटा (ॲप्लिकेशन सुरू झाल्यापासूनचा एकूण डेटा)
//     const lifetimeStats = {
//         totalIncome: "₹ 25,84,500",
//         totalBillsCount: "1,250"
//     };

//     // २. फिल्टर केलेला डेटा
//     const filteredData = {
//         yearly: `₹ ${parseInt(selectedYear) * 280}`,
//         monthly: `₹ ${selectedMonth.length * 4500}`,
//         daily: `₹ ${parseInt(selectedDay) * 200}`,
//         billsOnSelectedDay: "12" // त्या दिवशीची बिले
//     };

//     const billsList = [
//         { id: "BILL-501", customer: "Rahul Patil", amount: "₹ 1,200", time: "10:30 AM" },
//         { id: "BILL-502", customer: "Sagar Mane", amount: "₹ 1,300", time: "11:15 AM" },
//     ];

//     return (
//         <div className="min-h-screen bg-[#f8fafc] p-4 lg:p-10 font-sans text-slate-800">
//             <div className="max-w-6xl mx-auto">

//                 {/* --- SECTION 1: LIFETIME TOTALS (सर्वात वर एकूण कमाई) --- */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
//                     <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden group">
//                         <div className="relative z-10">
//                             <p className="text-indigo-400 text-xs font-black uppercase tracking-[0.2em] mb-2">Overall Total Income</p>
//                             <h2 className="text-4xl md:text-5xl font-black">{lifetimeStats.totalIncome}</h2>
//                             <p className="text-slate-500 text-xs mt-2 italic">Since Application Started</p>
//                         </div>
//                         <div className="absolute right-[-20px] bottom-[-20px] text-white/5 text-9xl font-black group-hover:scale-110 transition-transform">ALL</div>
//                     </div>

//                     <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex items-center justify-between">
//                         <div>
//                             <p className="text-slate-400 text-xs font-black uppercase tracking-[0.2em] mb-1">Total Lifetime Bills</p>
//                             <h2 className="text-4xl font-black text-slate-800">{lifetimeStats.totalBillsCount}</h2>
//                         </div>
//                         <div className="h-16 w-16 bg-indigo-50 text-indigo-600 rounded-3xl flex items-center justify-center text-3xl shadow-inner">
//                             📄
//                         </div>
//                     </div>
//                 </div>

//                 <hr className="mb-10 border-slate-200" />

//                 {/* --- SECTION 2: FILTERS & ANALYTICS --- */}
//                 <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
//                     <div>
//                         <h3 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Time-Based Reports</h3>
//                         <p className="text-slate-500 font-medium">तारीख निवडा आणि त्यावेळची कमाई पहा</p>
//                     </div>

//                     {/* फिल्टर्स */}
//                     <div className="flex flex-wrap gap-2 bg-white p-2 rounded-3xl shadow-sm border border-slate-100">
//                         <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)} className="bg-slate-50 px-4 py-2 rounded-2xl font-bold outline-none text-sm cursor-pointer hover:bg-slate-100">
//                             {years.map(y => <option key={y} value={y}>{y}</option>)}
//                         </select>

//                         <select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)} className="bg-slate-50 px-4 py-2 rounded-2xl font-bold outline-none text-sm cursor-pointer hover:bg-slate-100">
//                             {months.map(m => <option key={m} value={m}>{m}</option>)}
//                         </select>

//                         <select value={selectedDay} onChange={(e) => setSelectedDay(e.target.value)} className="bg-slate-50 px-4 py-2 rounded-2xl font-bold outline-none text-sm cursor-pointer hover:bg-slate-100">
//                             {days.map(d => <option key={d} value={d}>{d}</option>)}
//                         </select>
//                     </div>
//                 </div>

//                 {/* --- INCOME CARDS (Filtered) --- */}
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
//                     <IncomeCard title={`Yearly (${selectedYear})`} amount={filteredData.yearly} label="YR" color="bg-white" textColor="text-slate-800" subColor="text-slate-400" />
//                     <IncomeCard title={`Monthly (${selectedMonth})`} amount={filteredData.monthly} label="MO" color="bg-indigo-600" textColor="text-white" subColor="text-indigo-200" />
//                     <IncomeCard title={`Daily (${selectedDay} ${selectedMonth})`} amount={filteredData.daily} label="DA" color="bg-emerald-500" textColor="text-white" subColor="text-emerald-100" />
//                 </div>

//                 {/* --- BILLS LIST --- */}
//                 <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
//                     <div className="flex items-center justify-between mb-8">
//                         <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight">Recent Bills</h3>
//                         <div className="bg-indigo-50 text-indigo-700 px-4 py-2 rounded-xl text-xs font-black uppercase">
//                             Bills Today: {filteredData.billsOnSelectedDay}
//                         </div>
//                     </div>

//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                         {billsList.map((bill, index) => (
//                             <div key={index} className="flex items-center justify-between p-5 bg-slate-50 rounded-2xl border border-slate-100 hover:border-indigo-300 transition-all cursor-default">
//                                 <div className="flex items-center gap-4">
//                                     <div className="h-10 w-10 bg-white rounded-lg flex items-center justify-center text-xs font-black shadow-sm text-indigo-600">
//                                         #{index + 1}
//                                     </div>
//                                     <div>
//                                         <p className="font-bold text-slate-800 text-sm">Bill ID: {bill.id}</p>
//                                         <p className="text-[10px] text-slate-400 font-bold uppercase">{bill.time} • {bill.customer}</p>
//                                     </div>
//                                 </div>
//                                 <div className="text-right">
//                                     <p className="font-black text-slate-800">{bill.amount}</p>
//                                     <p className="text-[9px] text-emerald-500 font-bold uppercase">Success</p>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 </div>

//             </div>
//         </div>
//     );
// };

// // Reusable Income Card Component
// const IncomeCard = ({ title, amount, label, color, textColor, subColor }) => (
//     <div className={`${color} ${textColor} p-6 rounded-[2.5rem] border border-slate-100 shadow-sm relative overflow-hidden group`}>
//         <div className="relative z-10">
//             <p className={`text-[10px] font-black uppercase tracking-[0.2em] mb-2 ${subColor}`}>{title}</p>
//             <h3 className="text-3xl font-black">{amount}</h3>
//         </div>
//         <div className="absolute -right-4 -bottom-4 text-7xl font-black opacity-10 group-hover:scale-110 transition-transform">{label}</div>
//     </div>
// );

// export default DashboardHome;


import React, { useState, useEffect } from 'react';
import { useGetBillsTotalQuery } from '../../redux/api/bill.api';

const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

const DashboardHome = () => {
    const today = new Date();
    const [selectedYear, setSelectedYear] = useState(today.getFullYear());
    const [selectedMonth, setSelectedMonth] = useState(today.getMonth() + 1);
    const [selectedDay, setSelectedDay] = useState(today.getDate());

    const { data, refetch, isFetching } = useGetBillsTotalQuery({
        year: selectedYear,
        month: selectedMonth,
        day: selectedDay
    });
    // console.log(data)

    useEffect(() => {
        refetch();
    }, [selectedYear, selectedMonth, selectedDay]);

    const years = Array.from({ length: 11 }, (_, i) => 2020 + i); // 2020–2030
    const days = Array.from({ length: 31 }, (_, i) => i + 1); // 1–31

    return (
        <div className="h-full bg-white p-4 lg:p-10 font-sans text-slate-800">
            <div className="max-w-6xl mx-auto">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                    <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden group">
                        <div className="relative z-10">
                            <p className="text-indigo-400 text-xs font-black uppercase tracking-[0.2em] mb-2">Overall Total Income</p>
                            <h2 className="text-4xl md:text-5xl font-black">
                                ₹ {data?.overall?.toFixed(2) || 0}
                            </h2>
                            <p className="text-slate-500 text-xs mt-2 italic">Since Application Started</p>
                        </div>
                        <div className="absolute right-[-20px] bottom-[-20px] text-white/5 text-9xl font-black group-hover:scale-110 transition-transform">ALL</div>
                    </div>

                    <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex items-center justify-between">
                        <div>
                            <p className="text-slate-400 text-xs font-black uppercase tracking-[0.2em] mb-1">Total Lifetime Bills</p>
                            <h2 className="text-4xl font-black text-slate-800">{data?.totalBills || 0}</h2>
                        </div>
                        <div className="h-16 w-16 bg-indigo-50 text-indigo-600 rounded-3xl flex items-center justify-center text-3xl shadow-inner">
                            📄
                        </div>
                    </div>
                </div>

                <hr className="mb-10 border-slate-200" />

                {/* --- TIME-BASED FILTERS --- */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                    <div>
                        <h3 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Time-Based Reports</h3>
                        <p className="text-slate-500 font-medium">तारीख निवडा आणि त्यावेळची कमाई पहा</p>
                    </div>

                    <div className="flex flex-wrap gap-2 bg-white p-2 rounded-3xl shadow-sm border border-slate-100">
                        <select
                            value={selectedYear}
                            onChange={e => setSelectedYear(Number(e.target.value))}
                            className="bg-slate-50 px-4 py-2 rounded-2xl font-bold outline-none text-sm cursor-pointer hover:bg-slate-100"
                        >
                            {years.map(y => <option key={y} value={y}>{y}</option>)}
                        </select>

                        <select
                            value={selectedMonth}
                            onChange={e => setSelectedMonth(Number(e.target.value))}
                            className="bg-slate-50 px-4 py-2 rounded-2xl font-bold outline-none text-sm cursor-pointer hover:bg-slate-100"
                        >
                            {months.map((m, i) => <option key={m} value={i + 1}>{m}</option>)}
                        </select>

                        <select
                            value={selectedDay}
                            onChange={e => setSelectedDay(Number(e.target.value))}
                            className="bg-slate-50 px-4 py-2 rounded-2xl font-bold outline-none text-sm cursor-pointer hover:bg-slate-100"
                        >
                            {days.map(d => <option key={d} value={d}>{d}</option>)}
                        </select>
                    </div>
                </div>

                {/* --- INCOME CARDS --- */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    <IncomeCard
                        title={`Yearly (${selectedYear})`}
                        amount={`₹ ${data?.yearly?.toFixed(2) || 0}`}
                        label="YR"
                        color="bg-white"
                        textColor="text-slate-800"
                        subColor="text-slate-400"
                    />
                    <IncomeCard
                        title={`Monthly (${months[selectedMonth - 1]})`}
                        amount={`₹ ${data?.monthly?.toFixed(2) || 0}`}
                        label="MO"
                        color="bg-indigo-600"
                        textColor="text-white"
                        subColor="text-indigo-200"
                    />
                    <IncomeCard
                        title={`Daily (${selectedDay} ${months[selectedMonth - 1]})`}
                        amount={`₹ ${data?.daily?.toFixed(2) || 0}`}
                        label="DA"
                        color="bg-emerald-500"
                        textColor="text-white"
                        subColor="text-emerald-100"
                    />
                </div>

                {/* --- RECENT BILLS --- */}
                <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight">Recent Bills</h3>
                        <div className="bg-indigo-50 text-indigo-700 px-4 py-2 rounded-xl text-xs font-black uppercase">
                            Bills Today: {data?.recentBills?.length || 0}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {data?.recentBills?.slice(0, 2).map((bill, index) => (
                            <div key={bill._id} className="flex items-center justify-between p-5 bg-slate-50 rounded-2xl border border-slate-100 hover:border-indigo-300 transition-all cursor-default">
                                <div className="flex items-center gap-4">
                                    <div className="h-10 w-10 bg-white rounded-lg flex items-center justify-center text-xs font-black shadow-sm text-indigo-600">
                                        #{index + 1}
                                    </div>
                                    <div>
                                        {/* <p className="font-bold text-slate-800 text-sm">Bill ID: {bill._id}</p> */}
                                        <p className="font-bold text-slate-800 text-sm">Bill ID: {bill._id.slice(-4)}</p>
                                        <p className="text-[10px] text-slate-400 font-bold uppercase">
                                            {new Date(bill.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • {bill.customerName}
                                        </p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-black text-slate-800">₹ {bill.totalAmount.toFixed(2)}</p>
                                    <p className="text-[9px] text-emerald-500 font-bold uppercase">Success</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};

// Reusable Income Card Component
const IncomeCard = ({ title, amount, label, color, textColor, subColor }) => (
    <div className={`${color} ${textColor} p-6 rounded-[2.5rem] border border-slate-100 shadow-sm relative overflow-hidden group`}>
        <div className="relative z-10">
            <p className={`text-[10px] font-black uppercase tracking-[0.2em] mb-2 ${subColor}`}>{title}</p>
            <h3 className="text-3xl font-black">{amount}</h3>
        </div>
        <div className="absolute -right-4 -bottom-4 text-7xl font-black opacity-10 group-hover:scale-110 transition-transform">{label}</div>
    </div>
);

export default DashboardHome;












// import React, { useState, useEffect } from 'react';
// import { useGetBillsTotalQuery } from '../../redux/api/bill.api';

// const DashboardHome = () => {
//     const today = new Date();
//     const [selectedYear, setSelectedYear] = useState(today.getFullYear());
//     const [selectedMonth, setSelectedMonth] = useState(today.getMonth() + 1); // 1-12
//     const [selectedDay, setSelectedDay] = useState(today.getDate());

//     const { data, refetch, isLoading } = useGetBillsTotalQuery({
//         year: selectedYear,
//         month: selectedMonth,
//         day: selectedDay
//     });

//     // Generate years, months, days
//     const years = Array.from({ length: 11 }, (_, i) => 2020 + i);
//     const months = [
//         "January", "February", "March", "April", "May", "June",
//         "July", "August", "September", "October", "November", "December"
//     ];
//     const days = Array.from({ length: 31 }, (_, i) => i + 1);

//     // Refetch whenever filters change
//     useEffect(() => {
//         refetch();
//     }, [selectedYear, selectedMonth, selectedDay]);

//     if (isLoading) return <p>Loading...</p>;

//     return (
//         <div className="min-h-screen bg-[#f8fafc] p-4 lg:p-10 font-sans text-slate-800">
//             <div className="max-w-6xl mx-auto">

//                 {/* --- SECTION 1: LIFETIME TOTALS --- */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
//                     <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden group">
//                         <div className="relative z-10">
//                             <p className="text-indigo-400 text-xs font-black uppercase tracking-[0.2em] mb-2">Overall Total Income</p>
//                             <h2 className="text-4xl md:text-5xl font-black">₹ {data?.overall || 0}</h2>
//                             <p className="text-slate-500 text-xs mt-2 italic">Since Application Started</p>
//                         </div>
//                         <div className="absolute right-[-20px] bottom-[-20px] text-white/5 text-9xl font-black group-hover:scale-110 transition-transform">ALL</div>
//                     </div>

//                     <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex items-center justify-between">
//                         <div>
//                             <p className="text-slate-400 text-xs font-black uppercase tracking-[0.2em] mb-1">Total Lifetime Bills</p>
//                             <h2 className="text-4xl font-black text-slate-800">{data?.totalBills || 0}</h2>
//                         </div>
//                         <div className="h-16 w-16 bg-indigo-50 text-indigo-600 rounded-3xl flex items-center justify-center text-3xl shadow-inner">
//                             📄
//                         </div>
//                     </div>
//                 </div>

//                 <hr className="mb-10 border-slate-200" />

//                 {/* --- SECTION 2: FILTERS & ANALYTICS --- */}
//                 <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
//                     <div>
//                         <h3 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Time-Based Reports</h3>
//                         <p className="text-slate-500 font-medium">तारीख निवडा आणि त्यावेळची कमाई पहा</p>
//                     </div>

//                     <div className="flex flex-wrap gap-2 bg-white p-2 rounded-3xl shadow-sm border border-slate-100">
//                         <select
//                             value={selectedYear}
//                             onChange={(e) => setSelectedYear(Number(e.target.value))}
//                             className="bg-slate-50 px-4 py-2 rounded-2xl font-bold outline-none text-sm cursor-pointer hover:bg-slate-100"
//                         >
//                             {years.map(y => <option key={y} value={y}>{y}</option>)}
//                         </select>

//                         <select
//                             value={months[selectedMonth - 1]}
//                             onChange={(e) => setSelectedMonth(months.indexOf(e.target.value) + 1)}
//                             className="bg-slate-50 px-4 py-2 rounded-2xl font-bold outline-none text-sm cursor-pointer hover:bg-slate-100"
//                         >
//                             {months.map(m => <option key={m} value={m}>{m}</option>)}
//                         </select>

//                         <select
//                             value={selectedDay}
//                             onChange={(e) => setSelectedDay(Number(e.target.value))}
//                             className="bg-slate-50 px-4 py-2 rounded-2xl font-bold outline-none text-sm cursor-pointer hover:bg-slate-100"
//                         >
//                             {days.map(d => <option key={d} value={d}>{d}</option>)}
//                         </select>
//                     </div>
//                 </div>

//                 {/* --- INCOME CARDS (Filtered) --- */}
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
//                     <IncomeCard title={`Yearly (${selectedYear})`} amount={`₹ ${data?.yearly || 0}`} label="YR" color="bg-white" textColor="text-slate-800" subColor="text-slate-400" />
//                     <IncomeCard title={`Monthly (${months[selectedMonth - 1]})`} amount={`₹ ${data?.monthly || 0}`} label="MO" color="bg-indigo-600" textColor="text-white" subColor="text-indigo-200" />
//                     <IncomeCard title={`Daily (${selectedDay} ${months[selectedMonth - 1]})`} amount={`₹ ${data?.daily || 0}`} label="DA" color="bg-emerald-500" textColor="text-white" subColor="text-emerald-100" />
//                 </div>

//                 {/* --- RECENT BILLS --- */}
//                 <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
//                     <div className="flex items-center justify-between mb-8">
//                         <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight">Recent Bills</h3>
//                         <div className="bg-indigo-50 text-indigo-700 px-4 py-2 rounded-xl text-xs font-black uppercase">
//                             Bills Today: {data?.recentBills?.length || 0}
//                         </div>
//                     </div>

//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                         {data?.recentBills?.slice(0, 2).map((bill, index) => (
//                             <div key={bill._id} className="flex items-center justify-between p-5 bg-slate-50 rounded-2xl border border-slate-100 hover:border-indigo-300 transition-all cursor-default">
//                                 <div className="flex items-center gap-4">
//                                     <div className="h-10 w-10 bg-white rounded-lg flex items-center justify-center text-xs font-black shadow-sm text-indigo-600">
//                                         #{index + 1}
//                                     </div>
//                                     <div>
//                                         <p className="font-bold text-slate-800 text-sm">Bill ID: {bill._id}</p>
//                                         <p className="text-[10px] text-slate-400 font-bold uppercase">
//                                             {new Date(bill.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • {bill.customerName}
//                                         </p>
//                                     </div>
//                                 </div>
//                                 <div className="text-right">
//                                     <p className="font-black text-slate-800">₹ {bill.totalAmount}</p>
//                                     <p className="text-[9px] text-emerald-500 font-bold uppercase">{bill.paymentMethod}</p>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 </div>

//             </div>
//         </div>
//     );
// };

// // Reusable Income Card Component
// const IncomeCard = ({ title, amount, label, color, textColor, subColor }) => (
//     <div className={`${color} ${textColor} p-6 rounded-[2.5rem] border border-slate-100 shadow-sm relative overflow-hidden group`}>
//         <div className="relative z-10">
//             <p className={`text-[10px] font-black uppercase tracking-[0.2em] mb-2 ${subColor}`}>{title}</p>
//             <h3 className="text-3xl font-black">{amount}</h3>
//         </div>
//         <div className="absolute -right-4 -bottom-4 text-7xl font-black opacity-10 group-hover:scale-110 transition-transform">{label}</div>
//     </div>
// );

// export default DashboardHome;
