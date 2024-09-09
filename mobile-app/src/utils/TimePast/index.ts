function TimePast(pastDate?: Date): string {

    if(!pastDate) return ''

    const fromDate = new Date(pastDate)
    // Get the current date
    const now = new Date();
  
    // Calculate the time difference in milliseconds
    const timeDifference = now.getTime() - fromDate.getTime();
  
    // Convert the time difference to seconds, minutes, hours, and days
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
  
    if (days > 0) {
      return `${days}d`;
    } else if (hours > 0) {
      return `${hours}h`;
    } else if (minutes > 0) {
      return `${minutes}m`;
    } else {
      return `Agora`;
    }
  }
  

  export default TimePast;