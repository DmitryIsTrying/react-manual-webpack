import fs from 'fs'
import path from 'path'

/**
 * Ищет вызовы `t()` в строке кода и извлекает ключи.
 * @param {string} code - Код для анализа.
 * @returns {Set<string>} - Набор уникальных ключей.
 */
function parseKeysFromCode(code: string): Set<string> {
    const keys = new Set<string>()
    const regex = /t\(['"]([^'"]+)['"]\)/g // Регулярное выражение для поиска t('key')

    let match: RegExpExecArray | null
    while ((match = regex.exec(code)) !== null) {
        const key = match[1]
        // Фильтруем ключи: исключаем пути к файлам и другие лишние строки
        if (
            !key.startsWith('./') &&
            !key.includes('/') &&
            !key.includes('\\')
        ) {
            keys.add(key)
        }
    }

    return keys
}

/**
 * Рекурсивно парсит все файлы в директории.
 * @param {string} dirPath - Путь к директории.
 * @returns {Set<string>} - Набор уникальных ключей.
 */
export function parseKeysFromDirectory(dirPath: string): Set<string> {
    const keys = new Set<string>()
    const files = fs.readdirSync(dirPath)

    files.forEach((file) => {
        const filePath = path.join(dirPath, file)
        const stat = fs.statSync(filePath)

        // Исключаем файл скрипта из анализа
        if (filePath === __filename) {
            return
        }

        if (stat.isDirectory()) {
            const nestedKeys = parseKeysFromDirectory(filePath)
            nestedKeys.forEach((key) => keys.add(key))
        } else if (
            stat.isFile() &&
            (file.endsWith('.js') ||
                file.endsWith('.jsx') ||
                file.endsWith('.ts') ||
                file.endsWith('.tsx'))
        ) {
            const code = fs.readFileSync(filePath, 'utf-8')
            const fileKeys = parseKeysFromCode(code)
            fileKeys.forEach((key) => keys.add(key))
        }
    })

    return keys
}
