import React from 'react'
import './Search.css'

export default function CourseDropDown({ courses, selectedCourse, onCourseChange, selectedSemester }) {
    // Create a Set to store unique course identifiers
    const uniqueCourses = new Set();

    // Filter out duplicate courses
    const filteredCourses = courses.filter(course => {
        const courseIdentifier = `${course.course_subject} ${course.course_number}`;
        if (!uniqueCourses.has(courseIdentifier)) {
            uniqueCourses.add(courseIdentifier);
            return true;
        }
        return false;
    });

    // Sort the courses if the selected semester is 'all'
    if (selectedSemester === "all") {
        filteredCourses.sort((a, b) => {
            // First, compare by subject
            if (a.course_subject < b.course_subject) return -1;
            if (a.course_subject > b.course_subject) return 1;

            // If subjects are the same, compare by number
            return a.course_number.localeCompare(b.course_number, undefined, { numeric: true });
        });
    }

    return (
        <select
            className="dropdown"
            value={selectedCourse}
            onChange={(e) => onCourseChange(e.target.value)}
        >
            <option value="">Select a course</option>
            {filteredCourses.map((course) => (
                <option key={course.id} value={course.id}>
                    {`${course.course_subject} ${course.course_number}`}
                </option>
            ))}
        </select>
    );
}
