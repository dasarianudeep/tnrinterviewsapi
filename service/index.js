exports.searchByName = (interviews, q) => {
    const updateInterviews = interviews.filter(interview => {
        return interview.name.replace(/\s+/g, '').toLowerCase().indexOf(q.replace(/\s+/g, '').toLowerCase()) > -1
    });
    return updateInterviews;
}

exports.searchByYear = (interviews, year) => {
    const updateInterviews = year.split(',').reduce((res, y) => {
        const i = interviews.filter(interview => interview.date.indexOf(y) > -1);
        return res.concat(i);
    }, []);
    return updateInterviews;
}

exports.searchByGenre = (interviews, genre) => {
    const updateInterviews = genre.split(',').reduce((res, g) => {
        const i = interviews.filter(interview => interview.genre.includes(g));
        return res.concat(i);
    }, []);
    return updateInterviews;
}

exports.searchByPage = (interviews, page) => {
    const pageSize = 20;
    const startIndex = (Number(page) - 1)*20;
    return interviews.slice(startIndex, startIndex + 20);
}
