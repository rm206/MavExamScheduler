import React, { useState, useEffect } from 'react';
import './Search.css';

export default function SearchResults({ selectedSemester, selectedCourse, API_url }) {
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [addedExams, setAddedExams] = useState({});
    const api_url = API_url

    useEffect(() => {
        const fetchSearchResults = async () => {
            setLoading(true);
            setError(null);

            if (selectedSemester === 'all' && !selectedCourse) {
                setError("There are too many courses to display. Please choose a particular course to see results.");
                setLoading(false);
                return;
            }

            let endpoint;
            if (selectedSemester === 'all' && selectedCourse) {
                endpoint = `exams/course/${selectedCourse}`;
            } else if (selectedSemester !== 'all' && !selectedCourse) {
                endpoint = `exams/semester/${selectedSemester}`;
            } else if (selectedSemester !== 'all' && selectedCourse) {
                const storageKey = `MES_exams_${selectedSemester}_${selectedCourse}`;
                const storedResults = sessionStorage.getItem(storageKey);

                if (storedResults) {
                    setSearchResults(JSON.parse(storedResults));
                    setLoading(false);
                    return;
                }

                endpoint = `exams/semesterAndCourse/${selectedSemester}/${selectedCourse}`;
            }

            try {
                const response = await fetch(`${api_url}${endpoint}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch search results');
                }
                const data = await response.json();
                setSearchResults(data);

                if (selectedSemester !== 'all' && selectedCourse) {
                    sessionStorage.setItem(`MES_exams_${selectedSemester}_${selectedCourse}`, JSON.stringify(data));
                }
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }

            // Load added exams from session storage
            const storedAddedExams = JSON.parse(sessionStorage.getItem('MES_added_to_calendar') || '{}');
            setAddedExams(storedAddedExams);
        };

        fetchSearchResults();
    }, [selectedSemester, selectedCourse]);

    const getCourseInfo = (courseId) => {
        const storageKey = selectedSemester === 'all' ? 'MES_courses_all' : `MES_courses_${selectedSemester}`;
        const storedCourses = JSON.parse(sessionStorage.getItem(storageKey) || '[]');
        return storedCourses.find(course => course.id === courseId) || { course_subject: '', course_number: '' };
    };

    const toggleExamInCalendar = (exam) => {
        const examKey = `${exam.date}_${exam.start_time}_${exam.course_subject}_${exam.course_number}`;
        const updatedAddedExams = { ...addedExams };

        if (updatedAddedExams[examKey]) {
            delete updatedAddedExams[examKey];
        } else {
            updatedAddedExams[examKey] = exam;
        }

        setAddedExams(updatedAddedExams);
        sessionStorage.setItem('MES_added_to_calendar', JSON.stringify(updatedAddedExams));
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="error">{error}</div>;

    const formatTime = (time) => {
        if (!time) return '';
        const [hours, minutes] = time.split(':');
        const hour = parseInt(hours, 10);
        const ampm = hour >= 12 ? 'P.M.' : 'A.M.';
        const formattedHour = hour % 12 || 12;
        return `${formattedHour}:${minutes} ${ampm}`;
    };

    return (
        <div className="search-results-container">
            <table className="search-results-table">
                <thead>
                    <tr>
                        <th>Course Subject</th>
                        <th>Course Number</th>
                        <th>Section</th>
                        <th>Days Met</th>
                        <th>Date (YYYY-MM-DD)</th>
                        <th>Start Time</th>
                        <th>End Time</th>
                        <th>Building Name</th>
                        <th>Room No</th>
                        <th>Instructor Name</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {searchResults.map((result, index) => {
                        const courseInfo = selectedCourse ? getCourseInfo(selectedCourse) : getCourseInfo(result.course_id);
                        const examKey = `${result.date}_${result.start_time}_${courseInfo.course_subject}_${courseInfo.course_number}`;
                        const isAdded = !!addedExams[examKey];
                        return (
                            <tr key={index}>
                                <td>{courseInfo.course_subject}</td>
                                <td>{courseInfo.course_number}</td>
                                <td>{result.section}</td>
                                <td>{result.days_met}</td>
                                <td>{result.date}</td>
                                <td>{formatTime(result.start_time)}</td>
                                <td>{formatTime(result.end_time)}</td>
                                <td>{result.building_name}</td>
                                <td>{result.room_no}</td>
                                <td>{result.instructor_name}</td>
                                <td>
                                    <button
                                        onClick={() => toggleExamInCalendar({ ...result, ...courseInfo })}
                                        className={isAdded ? 'added-button' : 'add-button'}
                                    >
                                        {isAdded ? 'Added' : 'Add'}
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}