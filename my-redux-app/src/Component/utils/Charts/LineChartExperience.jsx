import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';

export default function LineChartExperience() {
    // Define your work experience data
    const workExperienceData = [
        { company: 'Bluesoft Infotech', startDate: '2021-12', endDate: '2023-03' },
        { company: 'Sourcenet Technology', startDate: '2023-04', endDate: 'current' }
    ];

    // Calculate the duration of work experience for each company
    const companyExperience = workExperienceData.map((work) => {
        const startDate = new Date(work.startDate);
        const endDate = work.endDate === 'current' ? new Date() : new Date(work.endDate);
        const experienceInMonths = (endDate.getFullYear() - startDate.getFullYear()) * 12 + endDate.getMonth() - startDate.getMonth();
        return {
            company: work.company,
            experience: experienceInMonths // Duration of work experience in months
        };
    });

    // Extract company names and experience durations for the chart data
    const companyNames = companyExperience.map((work) => work.company);
    const experienceData = companyExperience.map((work) => work.experience);

    return (
        <LineChart
            width={500}
            height={300}
            series={[{ data: experienceData, label: 'Work Experience (months)' }]}
            xAxis={[{ scaleType: 'point', data: companyNames }]}
            yAxis={[{ id: 'leftAxisId' }]}
        />
    );
}