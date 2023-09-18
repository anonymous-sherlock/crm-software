<?php
$validApiKeys = ['DoUWnWUyUTUGRVuGx0IOjKI3RaJ7WdZ+TEBMXclKQLx5ZbrxmU8GZw==', 'fQR3bWOuLMpyvjv9DblDW06gxgdeBL8nSvT1bhSKxFQBvFqA/CkCFA=='];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Check for the presence of API key in headers
    if (!isset($_SERVER['HTTP_API_KEY']) || !in_array($_SERVER['HTTP_API_KEY'], $validApiKeys)) {
        $response = [
            'success' => false,
            'error' => 'Invalid API key.',
        ];
        http_response_code(401); // Unauthorized status code
        echo json_encode($response);
        exit; // Terminate the script
    }

    if (!isset($_POST['remotePath']) || empty($_POST['remotePath'])) {
        $response = [
            'success' => false,
            'error' => 'Remote path is required. Please provide a valid remotePath.',
        ];
        http_response_code(400); // Bad Request status code
        echo json_encode($response);
        exit; // Terminate the script
    }

    // Continue with file processing
    $uploadDir = $_POST['remotePath']; // Get the directory path from the POST request.
    $uploadDir = sanitizeAndNormalizePath($uploadDir); // Sanitize and normalize the path
    $targetDir = 'uploads/' . $uploadDir; // Specify the base upload directory.

    if (!file_exists($targetDir)) {
        mkdir($targetDir, 0755, true); // Create the directory recursively if it doesn't exist.
    }

    $fileUrls = []; // Array to store file URLs
    $successMessages = [];

    if (isset($_FILES['productImages']['name']) && is_array($_FILES['productImages']['name'])) {
        // Multiple files are being uploaded
        $fileCount = count($_FILES['productImages']['name']);

        for ($i = 0; $i < $fileCount; $i++) {
            $sourceFile = $_FILES['productImages']['tmp_name'][$i]; // Source (temporary) file path
            $originalFilename = $_FILES['productImages']['name'][$i];

            // Modify the file name to be lowercase and replace spaces with hyphens
            $filename = strtolower(str_replace(' ', '-', $originalFilename));
            $targetFile = $targetDir . '/' . basename($filename); // Destination file path

            if (move_uploaded_file($sourceFile, $targetFile)) {
                $successMessages[] = 'File ' . $filename . ' uploaded successfully.';
                $fileUrls[] = generateFileUrl($targetFile); // Generate and store file URL
            } else {
                $successMessages[] = 'File ' . $filename . ' upload failed with error code ' . $_FILES['productImages']['error'][$i] . ': ' . getUploadErrorMessage($_FILES['productImages']['error'][$i]);
            }
        }
    } elseif (isset($_FILES['productImages']['name']) && !is_array($_FILES['productImages']['name'])) {
        // Single file is being uploaded
        $sourceFile = $_FILES['productImages']['tmp_name'];
        $originalFilename = $_FILES['productImages']['name'];

        // Modify the file name to be lowercase and replace spaces with hyphens
        $filename = strtolower(str_replace(' ', '-', $originalFilename));
        $targetFile = $targetDir . '/' . basename($filename); // Destination file path

        if (move_uploaded_file($sourceFile, $targetFile)) {
            $successMessages[] = 'File ' . $filename . ' uploaded successfully.';
            $fileUrls[] = generateFileUrl($targetFile); // Generate and store file URL
        } else {
            $successMessages[] = 'File ' . $filename . ' upload failed with error code ' . $_FILES['productImages']['error'] . ': ' . getUploadErrorMessage($_FILES['productImages']['error']);
        }
    }

    // Respond with success or error messages
    $response = [
        'success' => !empty($fileUrls), // Set to true if at least one file was uploaded successfully
        'message' => $successMessages, // Provide success or error messages
        'data' => [
            'imageUrls' => $fileUrls, // Include file URLs here
            'path' => $uploadDir, // Include sanitized path in data
        ],
    ];
    http_response_code(!empty($fileUrls) ? 200 : 500); // Success or Internal Server Error status code
    echo json_encode($response);
} else {
    $response = [
        'success' => false,
        'error' => 'Invalid request method.',
    ];
    http_response_code(400); // Bad Request status code
    echo json_encode($response);
}

function getUploadErrorMessage($errorCode)
{
    switch ($errorCode) {
        case UPLOAD_ERR_OK:
            return 'No errors.';
        case UPLOAD_ERR_INI_SIZE:
            return 'The uploaded file exceeds the upload_max_filesize directive in php.ini.';
        case UPLOAD_ERR_FORM_SIZE:
            return 'The uploaded file exceeds the MAX_FILE_SIZE directive that was specified in the HTML form.';
        case UPLOAD_ERR_PARTIAL:
            return 'The uploaded file was only partially uploaded.';
        case UPLOAD_ERR_NO_FILE:
            return 'No file was uploaded.';
        case UPLOAD_ERR_NO_TMP_DIR:
            return 'Missing a temporary folder.';
        case UPLOAD_ERR_CANT_WRITE:
            return 'Failed to write file to disk.';
        case UPLOAD_ERR_EXTENSION:
            return 'A PHP extension stopped the file upload.';
        default:
            return 'Unknown error';
    }
}

function generateFileUrl($filePath)
{
    // Replace this with your actual URL generation logic
    return 'https://cdn-crm.adscrush.com/' . $filePath;
}

function sanitizeAndNormalizePath($path)
{
    // Remove leading and trailing slashes and normalize slashes
    $path = trim($path, '/');
    $path = str_replace(['\\', '/'], DIRECTORY_SEPARATOR, $path);
    return $path;
}
