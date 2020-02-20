const baseUrl = "http://localhost:5000/api/camp-us";

// authentication
export const CREATE_ACCOUNT_ENDPOINT = `${baseUrl}/auth/create-account`;
export const LOG_IN_USER = `${baseUrl}/auth/login`;
export const VERIFY_AUTHENTICATION = `${baseUrl}/auth/verify-authentication`;

// profile
export const GET_USER_PROFILE = `${baseUrl}/profile`;

// check relationship between auth user id and the current profile user
export const CHECK_RELATIONSHIP = `${baseUrl}/profile/check-connection`;

// says
export const GET_USER_SAYS = `${baseUrl}/says`;

// user interactions
export const HAVE_SAY = `${baseUrl}/interaction/new-post`;
export const COMMENT = `${baseUrl}/interaction/new-comment`;
export const LIKE_UNLIKE = `${baseUrl}/interaction/post/like`;
// following and unfollowing =
export const FOLLOW = `${baseUrl}/connections/follow`;
export const UNFOLLOW = `${baseUrl}/connections/unfollow`;

// getting users conversations
export const GET_CONVERSATIONS = `${baseUrl}/messaging/get-all-conversations`;
