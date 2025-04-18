export function generateOrderNumber(prefix = 'ORD') {
  const timestamp = Date.now();

  const base36Timestamp = timestamp.toString(36).toUpperCase();

  const randomSuffix = Math.random().toString(36).substring(2, 6).toUpperCase();

  const orderNumber = `${prefix}-${base36Timestamp}-${randomSuffix}`;

  return orderNumber;
}
