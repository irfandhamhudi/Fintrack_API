export const authView = (user: {
  _id: unknown;
  name: string;
  email: string;
  currency: string;
  timezone: string;
  avatarUrl?: string;
}) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  currency: user.currency,
  timezone: user.timezone,
  avatarUrl: user.avatarUrl,
});
