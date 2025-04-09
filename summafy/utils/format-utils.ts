export function formatFileNameAsTitle(fileName: string): string {
    if (!fileName) return '';

    // Remove file extension
    const withoutExtension = fileName.replace(/\.[^/.]+$/, '');

    // Replace special characters with spaces
    const withSpaces = withoutExtension
        .replace(/[-_]/g, ' ')
        .replace(/([a-z])([A-Z])/g, '$1 $2')
        .replace(/[^a-zA-Z0-9 ]/g, ' ');

    // Capitalize each word and clean up
    return withSpaces
        .split(' ')
        .filter(word => word.length > 0) // Remove empty strings
        .map(word =>
            word.charAt(0).toUpperCase() +
            word.slice(1).toLowerCase()
        )
        .join(' ')
        .trim()
        .replace(/\s+/g, ' '); // Replace multiple spaces with single space
}