import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faTrash } from '@fortawesome/free-solid-svg-icons';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import './Calendar.css';

export default function Calendar() {
    const [storedExams, setStoredExams] = useState([]);

    useEffect(() => {
        const loadStoredExams = () => {
            const storedAddedExams = JSON.parse(sessionStorage.getItem('MES_added_to_calendar') || '{}');
            setStoredExams(Object.values(storedAddedExams));
        };

        loadStoredExams();

        const handleStorageChange = (e) => {
            if (e.key === 'MES_added_to_calendar') {
                loadStoredExams();
            }
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    const removeExam = (exam) => {
        const storedAddedExams = JSON.parse(sessionStorage.getItem('MES_added_to_calendar') || '{}');
        const examKey = `${exam.date}_${exam.start_time}_${exam.course_subject}_${exam.course_number}_${exam.section}`;

        delete storedAddedExams[examKey];
        sessionStorage.setItem('MES_added_to_calendar', JSON.stringify(storedAddedExams));

        setStoredExams(Object.values(storedAddedExams));

        // Trigger storage event for other components
        window.dispatchEvent(new Event('storage'));
    };

    const formatDateTime = (date, time) => {
        const [year, month, day] = date.split('-');
        const [hours, minutes] = time.split(':');
        return `${year}${month}${day}T${hours}${minutes}00`;
    };

    const handleExportGoogleCalendar = (exam) => {
        try {
            const googleCalendarURL = 'https://www.google.com/calendar/render?action=TEMPLATE';

            const startTime = formatDateTime(exam.date, exam.start_time);
            const endTime = formatDateTime(exam.date, exam.end_time);

            const calendarContent = [
                `text=${encodeURIComponent(`${exam.course_subject} ${exam.course_number} - Exam`)}`,
                `dates=${startTime}/${endTime}`,
                `details=${encodeURIComponent(`Section: ${exam.section}, Building: ${exam.building_name}, Room: ${exam.room_no}, Instructor: ${exam.instructor_name}`)}`,
                `location=${encodeURIComponent(`${exam.building_name} ${exam.room_no}`)}`,
            ].join('&');

            const fullURL = `${googleCalendarURL}&${calendarContent}`;

            window.open(fullURL, '_blank');
        } catch (error) {
            console.error('Error exporting Google Calendar:', error);
        }
    };

    const handleExportCalendar = (exam) => {
        try {
            const calendarContent = [
                'BEGIN:VCALENDAR',
                'VERSION:2.0',
                'CALSCALE:GREGORIAN',
                'BEGIN:VEVENT',
                `SUMMARY:${exam.course_subject} ${exam.course_number} - Exam`,
                `DESCRIPTION:Section: ${exam.section}\\nBuilding: ${exam.building_name}\\nRoom: ${exam.room_no}\\nInstructor: ${exam.instructor_name}`,
                `DTSTART:${formatDateTime(exam.date, exam.start_time)}`,
                `DTEND:${formatDateTime(exam.date, exam.end_time)}`,
                `LOCATION:${exam.building_name} ${exam.room_no}`,
                'STATUS:CONFIRMED',
                'SEQUENCE:0',
                'BEGIN:VALARM',
                'TRIGGER:-PT15M',
                'DESCRIPTION:Reminder',
                'ACTION:DISPLAY',
                'END:VALARM',
                'END:VEVENT',
                'END:VCALENDAR',
            ].join('\n');

            const calendarDataURI = `data:text/calendar;charset=utf-8,${encodeURIComponent(calendarContent)}`;
            const link = document.createElement('a');
            link.href = calendarDataURI;
            link.download = `exam_${exam.course_subject}_${exam.course_number}.ics`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error('Error exporting calendar:', error);
        }
    };

    const handleExportAllCalendar = () => {
        try {
            const calendarContent = [
                'BEGIN:VCALENDAR',
                'VERSION:2.0',
                'CALSCALE:GREGORIAN',
                ...storedExams.flatMap(exam => [
                    'BEGIN:VEVENT',
                    `SUMMARY:${exam.course_subject} ${exam.course_number} - Exam`,
                    `DESCRIPTION:Section: ${exam.section}\\nBuilding: ${exam.building_name}\\nRoom: ${exam.room_no}\\nInstructor: ${exam.instructor_name}`,
                    `DTSTART:${formatDateTime(exam.date, exam.start_time)}`,
                    `DTEND:${formatDateTime(exam.date, exam.end_time)}`,
                    `LOCATION:${exam.building_name} ${exam.room_no}`,
                    'STATUS:CONFIRMED',
                    'SEQUENCE:0',
                    'BEGIN:VALARM',
                    'TRIGGER:-PT15M',
                    'DESCRIPTION:Reminder',
                    'ACTION:DISPLAY',
                    'END:VALARM',
                    'END:VEVENT'
                ]),
                'END:VCALENDAR'
            ].join('\n');

            const calendarDataURI = `data:text/calendar;charset=utf-8,${encodeURIComponent(calendarContent)}`;
            const link = document.createElement('a');
            link.href = calendarDataURI;
            link.download = `all_exams.ics`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error('Error exporting all exams to calendar:', error);
        }
    };

    const handleExportAllGoogleCalendar = () => {
        try {
            const googleCalendarURL = 'https://www.google.com/calendar/render?action=TEMPLATE';
            const events = storedExams.map(exam => {
                const startTime = formatDateTime(exam.date, exam.start_time);
                const endTime = formatDateTime(exam.date, exam.end_time);
                return [
                    `text=${encodeURIComponent(`${exam.course_subject} ${exam.course_number} - Exam`)}`,
                    `dates=${startTime}/${endTime}`,
                    `details=${encodeURIComponent(`Section: ${exam.section}, Building: ${exam.building_name}, Room: ${exam.room_no}, Instructor: ${exam.instructor_name}`)}`,
                    `location=${encodeURIComponent(`${exam.building_name} ${exam.room_no}`)}`,
                ].join('&');
            });

            const fullURL = `${googleCalendarURL}&${events.join('&')}`;
            window.open(fullURL, '_blank');
        } catch (error) {
            console.error('Error exporting all exams to Google Calendar:', error);
        }
    };

    const formatTime = (time) => {
        if (!time) return '';
        const [hours, minutes] = time.split(':');
        const hour = parseInt(hours, 10);
        const ampm = hour >= 12 ? 'P.M.' : 'A.M.';
        const formattedHour = hour % 12 || 12;
        return `${formattedHour}:${minutes} ${ampm}`;
    };

    return (
        <div className="calendar-container">
            <h2>Added Exams</h2>
            {storedExams.length > 0 ? (
                <>
                    <table className="calendar-table">
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
                                <th>Export</th>
                                <th>Remove</th>
                            </tr>
                        </thead>
                        <tbody>
                            {storedExams.map((exam, index) => (
                                <tr key={index}>
                                    <td>{exam.course_subject}</td>
                                    <td>{exam.course_number}</td>
                                    <td>{exam.section}</td>
                                    <td>{exam.days_met}</td>
                                    <td>{exam.date}</td>
                                    <td>{formatTime(exam.start_time)}</td>
                                    <td>{formatTime(exam.end_time)}</td>
                                    <td>{exam.building_name}</td>
                                    <td>{exam.room_no}</td>
                                    <td>{exam.instructor_name}</td>
                                    <td>
                                        <button onClick={() => handleExportCalendar(exam)} className="export-button">
                                            <FontAwesomeIcon icon={faCalendar} />
                                        </button>
                                        <button onClick={() => handleExportGoogleCalendar(exam)} className="export-button">
                                            <FontAwesomeIcon icon={faGoogle} />
                                        </button>
                                    </td>
                                    <td>
                                        <button onClick={() => removeExam(exam)} className="remove-button">
                                            <FontAwesomeIcon icon={faTrash} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="export-all-buttons">
                        <button onClick={handleExportAllCalendar} className="export-all-button">
                            <FontAwesomeIcon icon={faCalendar} /> Export All to ICS
                        </button>
                    </div>
                </>
            ) : (
                <p>No exams added to the calendar yet.</p>
            )}
        </div>
    );
}