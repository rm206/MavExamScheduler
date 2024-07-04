import React from 'react';
import './Search.css';

const SemesterDropDown = ({ semesters, selectedSemester, onSemesterChange }) => {
    // Sort semesters from most recent to oldest
    const sortedSemesters = [...semesters].sort((a, b) => {
        if (a.semester_year !== b.semester_year) {
            return b.semester_year - a.semester_year;
        }
        return a.semester_name === 'Fall' ? -1 : 1;
    });

    return (
        <select
            className="dropdown"
            value={selectedSemester}
            onChange={(e) => onSemesterChange(e.target.value)}
        >
            <option value="">Select a semester</option>
            {sortedSemesters.map((semester) => (
                <option key={semester.id} value={semester.id}>
                    {`${semester.semester_name} ${semester.semester_year}`}
                </option>
            ))}
            <option value="all">All semesters</option>
        </select>
    );
};

export default SemesterDropDown;