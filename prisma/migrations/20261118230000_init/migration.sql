CREATE TABLE `data_sources` (
    `id` CHAR(36) NOT NULL,
    `code` VARCHAR(100) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `provider_type` VARCHAR(30) NOT NULL,
    `official_status` ENUM('official', 'licensed', 'manual', 'disabled') NOT NULL DEFAULT 'disabled',
    `licensing_reference` VARCHAR(2048) NULL,
    `enabled` BOOLEAN NOT NULL DEFAULT false,
    `terms_reviewed_at` DATETIME(3) NULL,
    `terms_reviewed_by` VARCHAR(255) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `data_sources_code_key`(`code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
