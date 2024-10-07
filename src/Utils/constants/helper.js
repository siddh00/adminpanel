export const convertDate = (dateString) => {
    const dateObj = new Date(dateString);
    // Get day, month, and year
    const day = String(dateObj.getDate()).padStart(2, '0'); // Day (DD)
    const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // Month (MM) (Note: getMonth() returns 0-based month index)
    const year = dateObj.getFullYear(); // Year (YYYY)

    return `${day}/${month}/${year}`;

}
