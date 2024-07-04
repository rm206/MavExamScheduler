import React from 'react'
import { useState, useEffect } from 'react';
import SemesterDropdown from './SemesterDropDown';
import CourseDropdown from './CourseDropDown';
import SearchResults from './SearchResults';
import './Search.css'

export default function Search() {

    const api_url = "https://mav-exam-scheduler-1eb78284eaa3.herokuapp.com/"
    const [semesters, setSemesters] = useState([]);
    const [selectedSemester, setSelectedSemester] = useState('');
    const [courses, setCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState('');
    const [showSearchResults, setShowSearchResults] = useState(false);


    useEffect(() => {
        const fetchSemesters = async () => {
            // Check session storage for semesters
            const storedSemesters = sessionStorage.getItem("MES_all_semesters");

            if (storedSemesters) {
                setSemesters(JSON.parse(storedSemesters));
                console.log("Semesters fetched from session storage")
            }
            else {
                try {
                    const response = await fetch(api_url + "semesters");
                    if (response.ok) {
                        const data = await response.json();
                        setSemesters(data);
                        sessionStorage.setItem("MES_all_semesters", JSON.stringify(data));
                    }
                    else {
                        console.error("Failed to fetch semesters:", response.statusText);
                    }
                }
                catch (error) {
                    console.error("Error fetching semesters:", error);
                }
            }
        };

        fetchSemesters();
    }, []);

    useEffect(() => {
        const fetchCourses = async () => {
            if (selectedSemester) {
                const storageKey = selectedSemester === 'all' ? 'MES_courses_all' : `MES_courses_${selectedSemester}`;
                const storedCourses = sessionStorage.getItem(storageKey);
                if (storedCourses) {
                    setCourses(JSON.parse(storedCourses));
                    console.log("Courses fetched from session storage");
                }
                else {
                    try {
                        const endpoint = selectedSemester === 'all' ? 'courses/all' : `courses/${selectedSemester}`;
                        const response = await fetch(`${api_url}${endpoint}`);
                        if (response.ok) {
                            const data = await response.json();
                            setCourses(data);
                            sessionStorage.setItem(storageKey, JSON.stringify(data));
                        }
                        else {
                            console.error("Failed to fetch courses:", response.statusText);
                        }
                    }
                    catch (error) {
                        console.error("Error fetching courses:", error);
                    }
                }
            }
            else {
                setCourses([]);
            }
        };

        fetchCourses();
    }, [selectedSemester]);

    const handleSemesterChange = (semesterId) => {
        setSelectedSemester(semesterId);
    };

    const handleCourseChange = (courseId) => {
        setSelectedCourse(courseId);
    };

    const handleSearchResultVisibility = () => {
        setShowSearchResults(true);
    };


    return (
        <>
            <div className="semester-selection">
                <h2>Select a Semester</h2>
                <SemesterDropdown
                    semesters={semesters}
                    selectedSemester={selectedSemester}
                    onSemesterChange={handleSemesterChange}
                />
                {selectedSemester && (
                    <>
                        <h2>Select a Course</h2>
                        <CourseDropdown
                            courses={courses}
                            selectedCourse={selectedCourse}
                            onCourseChange={handleCourseChange}
                            selectedSemester={selectedSemester}
                        />
                        <button onClick={handleSearchResultVisibility} className="search-button">Search</button>
                    </>
                )}
            </div>
            {showSearchResults && (
                <div className="search-results">
                    <SearchResults
                        selectedSemester={selectedSemester}
                        selectedCourse={selectedCourse}
                        API_url={api_url}
                    />
                </div>
            )}
        </>
    );
};
