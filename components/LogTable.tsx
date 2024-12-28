"use client"
import { useState } from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { Skeleton } from "@/components/ui/skeleton";

interface LogTableProps {
    logs: { _id: string; logdata: string; NoofSteps: number; NoofCals: number; activitysession: number; walk: number; session: number; totalpoints: number; activities: string[] }[] | { message: string };
}

const TableRowSkeleton = () => (
    <TableRow>
        <TableCell><Skeleton className="h-4 w-[80px]" /></TableCell>
        <TableCell><Skeleton className="h-4 w-[50px]" /></TableCell>
        <TableCell><Skeleton className="h-4 w-[60px]" /></TableCell>
        <TableCell><Skeleton className="h-4 w-[50px]" /></TableCell>
        <TableCell><Skeleton className="h-4 w-[50px]" /></TableCell>
        <TableCell><Skeleton className="h-4 w-[50px]" /></TableCell>
        <TableCell><Skeleton className="h-4 w-[50px]" /></TableCell>
        <TableCell><Skeleton className="h-4 w-[120px]" /></TableCell>
    </TableRow>
);

const LogTable: React.FC<LogTableProps> = ({ logs }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const logsPerPage = 5;
    const indexOfLastLog = currentPage * logsPerPage;
    const indexOfFirstLog = indexOfLastLog - logsPerPage;
    // Ensure logs is an array before slicing
    const currentLogs = Array.isArray(logs) ? logs.slice(indexOfFirstLog, indexOfLastLog) : [];
    const totalPages = Math.ceil((Array.isArray(logs) ? logs.length : 0) / logsPerPage);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    if (!Array.isArray(logs) && logs.message === 'No log found') {
        return (
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Log Data</TableHead>
                        <TableHead>Steps</TableHead>
                        <TableHead>Calories Burnt</TableHead>
                        <TableHead>Sessions</TableHead>
                        <TableHead>Walking Points</TableHead>
                        <TableHead>Session Points</TableHead>
                        <TableHead>Total Points</TableHead>
                        <TableHead>Activities</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {[...Array(5)].map((_, index) => (
                        <TableRowSkeleton key={index} />
                    ))}
                </TableBody>
            </Table>
        );
    }
    

    return (
        <div>
            <Table className="mt-4">
                <TableCaption>Page {currentPage} of {totalPages}</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Log Data</TableHead>
                        <TableHead>Steps</TableHead>
                        <TableHead>Calories Burnt</TableHead>
                        <TableHead>Sessions</TableHead>
                        <TableHead>Walking Points</TableHead>
                        <TableHead>Session Points</TableHead>
                        <TableHead>Total Points</TableHead>
                        <TableHead>Activities</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {currentLogs.map((log) => (
                        <TableRow key={log._id}>
                            <TableCell>{log.logdata}</TableCell>
                            <TableCell>{log.NoofSteps}</TableCell>
                            <TableCell>{log.NoofCals}</TableCell>
                            <TableCell>{log.activitysession}</TableCell>
                            <TableCell>{log.walk}</TableCell>
                            <TableCell>{log.session}</TableCell>
                            <TableCell>{log.totalpoints}</TableCell>
                            <TableCell>{log.activities.join(', ')}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <div className="flex justify-between mt-4">
                <Button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
                    <ChevronLeft className="h-5 w-5" />
                </Button>
                <Button onClick={() => paginate(currentPage + 1)} disabled={indexOfLastLog >= (Array.isArray(logs) ? logs.length : 0)}>
                <ChevronRight   className="h-5 w-5" />
                </Button>
            </div>
        </div>
    );
};

export default LogTable;
