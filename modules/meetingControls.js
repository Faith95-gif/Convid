// Meeting controls module for managing chat, file sharing, and emoji reactions
export class MeetingControls {
  constructor() {
    this.settings = {
      chatEnabled: true,
      fileShareEnabled: true,
      emojiReactionsEnabled: true
    };
    this.meetings = new Map(); // meetingId -> settings
  }

  // Initialize meeting controls for a specific meeting
  initializeMeeting(meetingId, hostSocketId) {
    this.meetings.set(meetingId, {
      hostSocketId,
      settings: { ...this.settings }
    });
  }

  // Update meeting settings
  updateMeetingSettings(meetingId, newSettings) {
    const meeting = this.meetings.get(meetingId);
    if (meeting) {
      meeting.settings = { ...meeting.settings, ...newSettings };
      return meeting.settings;
    }
    return null;
  }

  // Get meeting settings
  getMeetingSettings(meetingId) {
    const meeting = this.meetings.get(meetingId);
    return meeting ? meeting.settings : this.settings;
  }

  // Check if user is host of the meeting
  isHost(meetingId, socketId) {
    const meeting = this.meetings.get(meetingId);
    return meeting && meeting.hostSocketId === socketId;
  }

  // Remove meeting when it ends
  removeMeeting(meetingId) {
    this.meetings.delete(meetingId);
  }
}