import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

type StatusInterface = {
	[key: string]: string;
}

type RowsData = {
	id: number;
	product: string;
	img: string;
	customer: string;
	date: string;
	amount: number;
	status: string;
}

const List = () => {
	const rows: RowsData[] = [
		{
			id: 1143155,
			product: "Acer Nitro 5",
			img: "https://m.media-amazon.com/images/I/81bc8mA3nKL._AC_UY327_FMwebp_QL65_.jpg",
			customer: "John Smith",
			date: "1 March",
			amount: 785,
			status: "Approved",
		},
		{
			id: 2235235,
			product: "Playstation 5",
			img: "https://m.media-amazon.com/images/I/31JaiPXYI8L._AC_UY327_FMwebp_QL65_.jpg",
			customer: "Michael Doe",
			date: "1 March",
			amount: 900,
			status: "Pending",
		},
		{
			id: 2342353,
			product: "Redragon S101",
			img: "https://m.media-amazon.com/images/I/71kr3WAj1FL._AC_UY327_FMwebp_QL65_.jpg",
			customer: "John Smith",
			date: "1 March",
			amount: 35,
			status: "Pending",
		},
		{
			id: 2357741,
			product: "Razer Blade 15",
			img: "https://m.media-amazon.com/images/I/71wF7YDIQkL._AC_UY327_FMwebp_QL65_.jpg",
			customer: "Jane Smith",
			date: "1 March",
			amount: 920,
			status: "Approved",
		},
		{
			id: 2342355,
			product: "ASUS ROG Strix",
			img: "https://m.media-amazon.com/images/I/81hH5vK-MCL._AC_UY327_FMwebp_QL65_.jpg",
			customer: "Harold Carol",
			date: "1 March",
			amount: 2000,
			status: "Pending",
		},
	];
	
	// Sort rows by parameter: 'status' | 'amount' | 'date'
	

	const status: StatusInterface = {
		'Approved': 'text-green-500 bg-[rgba(0,255,0,.2)]',
		'Pending': 'text-orange-500 bg-[rgba(255,165,0,.2)]',
		'Rejected': 'text-red-500 bg-[rgba(255,0,0,.2)]',
	};

	return (
		<TableContainer component={Paper} >
			<Table sx={{ minWidth: 650 }} aria-label="simple table">
				<TableHead>
					<TableRow>
						<TableCell className="tableCell">ID da Reserva</TableCell>
						<TableCell className="tableCell">Sessão</TableCell>
						<TableCell className="tableCell">Cliente</TableCell>
						<TableCell className="tableCell">Data</TableCell>
						<TableCell className="tableCell">Preço</TableCell>
						<TableCell className="tableCell">Estado</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{rows.map((row) => (
						<TableRow key={row.id} className='hover:bg-[#EEE] cursor-pointer'>
							<TableCell className="tableCell">{row.id}</TableCell>
							<TableCell className="tableCell">
								<div className="flex items-center">
									<img src={row.img} alt="" className="w-8 h-8 rounded-[50%] mr-2.5 object-cover" />
									{row.product}
								</div>
							</TableCell>
							<TableCell className="tableCell">{row.customer}</TableCell>
							<TableCell className="tableCell">{row.date}</TableCell>
							<TableCell className="tableCell">{row.amount} kz</TableCell>
							<TableCell className="tableCell">
								<span
									className={`
										p-2 rounded-md ${status[row.status]}
									`}
								>
									{row.status}
								</span>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default List;