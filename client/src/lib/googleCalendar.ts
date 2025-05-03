// Google Calendar API integration

interface GoogleCalendarEvent {
  summary: string;
  description: string;
  startDateTime: string;
  endDateTime: string;
  attendees?: string[];
  timeZone?: string;
}

// Get the Google Calendar booking URL
export const getGoogleCalendarLinkUrl = ({
  summary,
  description,
  startDateTime,
  endDateTime,
  timeZone = 'America/Edmonton'
}: GoogleCalendarEvent): string => {
  // Format: yyyyMMddTHHmmssZ
  // Convert to UTC for Google Calendar
  const formatForCalendar = (date: string) => {
    return new Date(date).toISOString().replace(/-|:|\.\d+/g, '');
  };

  const startDate = formatForCalendar(startDateTime);
  const endDate = formatForCalendar(endDateTime);

  // Create Google Calendar add link with pre-filled details
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(summary)}&details=${encodeURIComponent(description)}&dates=${startDate}/${endDate}&ctz=${encodeURIComponent(timeZone)}`;
};

// Generate a calendar event for HVAC appointment
export const createAppointmentEvent = ({
  customerName,
  phone,
  service,
  address,
  date,
  timeSlot
}: {
  customerName: string;
  phone: string;
  service: string;
  address?: string;
  date: string;
  timeSlot: string;
}): GoogleCalendarEvent => {
  // Convert date and time slot to start/end date times
  // Assume time slots are 1.5 hours long
  const [startHour, startMinute] = timeSlot.replace(' AM', '').replace(' PM', '').split(':').map(Number);
  const isPM = timeSlot.includes('PM') && startHour !== 12;
  
  // Create start and end date objects
  const startDate = new Date(date);
  startDate.setHours(isPM ? startHour + 12 : startHour, startMinute || 0, 0, 0);
  
  const endDate = new Date(startDate);
  endDate.setMinutes(endDate.getMinutes() + 90); // 1.5 hour appointment
  
  // Format summary and description
  const summary = `AfterHours HVAC: ${service} - ${customerName}`;
  const description = `
    HVAC Service Appointment\n
    Customer: ${customerName}\n
    Phone: ${phone}\n
    Service: ${service}\n
    ${address ? `Address: ${address}\n\n` : ''}
    
    This appointment was booked through the AfterHours HVAC website.
  `;
  
  return {
    summary,
    description,
    startDateTime: startDate.toISOString(),
    endDateTime: endDate.toISOString(),
    timeZone: 'America/Edmonton',
    attendees: ['service@afterhourshvac.com'] // Replace with your business email
  };
};
