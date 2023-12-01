/**
 * 生成 uuid
 * @returns String
 */
export function uuid() {
	const baseURL = URL.createObjectURL(new Blob());
	const uuid = baseURL.toString();
	URL.revokeObjectURL(baseURL);
	return uuid.substring(uuid.lastIndexOf('/') + 1);
}