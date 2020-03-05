export const baseUrl = "https://konert.herokuapp.com";
export const apiUrl = `${baseUrl}/api/v1`;

// authentication
export const CREATE_ACCOUNT_ENDPOINT = `${apiUrl}/auth/create-account`;
export const LOG_IN_USER = `${apiUrl}/auth/login`;
export const VERIFY_AUTHENTICATION = `${apiUrl}/auth/verify-authentication`;

// profile
export const GET_USER_PROFILE = `${apiUrl}/profile`;

// check relationship between auth user id and the current profile user
export const CHECK_RELATIONSHIP = `${apiUrl}/profile/check-connection`;
export const LOAD_FEEDS = `${apiUrl}/profile/feeds/get-feeds`;

// says
export const GET_USER_SAYS = `${apiUrl}/says`;

// user interactions
export const HAVE_SAY = `${apiUrl}/interaction/new-post`;
export const COMMENT = `${apiUrl}/interaction/new-comment`;
export const LIKE_UNLIKE = `${apiUrl}/interaction/post/like`;
// following and unfollowing =
export const FOLLOW = `${apiUrl}/connections/follow`;
export const UNFOLLOW = `${apiUrl}/connections/unfollow`;

// getting users conversations
export const GET_CONVERSATIONS = `${apiUrl}/messaging/get-all-conversations`;
export const GET_ACTIVE_CONVERSATION = `${apiUrl}/messaging/get-active-conversation`;

// sending message
export const SEND_MESSAGE = `${apiUrl}/messaging/new-message`;

// searching for a user
export const FIND_SOMEONE = `${apiUrl}/people/search`;

// notification
export const GET_USER_NOTIFICATIONS = `${apiUrl}/notifications/get-notifications`;

// viewed post
export const GET_POST_DATA = `${apiUrl}/interaction/getpost`;
