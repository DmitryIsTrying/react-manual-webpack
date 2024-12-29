import fs from 'fs'
import path from 'path'
import { parseKeysFromDirectory } from './parseText'

/**
 * Заполняет файлы переводов ключами.
 * @param {Set<string>} keys - Набор ключей для перевода.
 * @param {string[]} locales - Локали, для которых нужно создать переводы.
 * @param {string} mainLocale - Основная локаль, где ключ = значение.
 * @param {string} defaultValue - Значение по умолчанию для других локалей.
 */
function fillTranslations(
    keys: Set<string>,
    locales: string[],
    mainLocale: string,
    defaultValue = 'НУЖЕНПЕРЕВОД'
) {
    const keysArray = Array.from(keys)

    for (const locale of locales) {
        const translations: Record<string, string> = {}

        for (const key of keysArray) {
            // В основной локали ключ = значению, в остальных — ключ = defaultValue
            translations[key] = locale === mainLocale ? key : defaultValue
        }

        // Создаём директорию, если её нет
        const dirPath = path.join(
            __dirname,
            '../../../../public',
            'locales',
            locale
        )
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true })
        }

        // Сохраняем переводы в файл
        const filePath = path.join(dirPath, 'translation.json')
        fs.writeFileSync(filePath, JSON.stringify(translations, null, 2))

        console.log(`Файл переводов для локали "${locale}" создан: ${filePath}`)
    }
}

// Пример использования
const dirPath = process.argv[2] || path.join(__dirname, '../../../../src') // Путь к директории с ключами
const locales = ['ru', 'en'] // Локали для перевода
const mainLocale = 'ru' // Основная локаль, где ключ = значению

const keys = parseKeysFromDirectory(dirPath)
fillTranslations(keys, locales, mainLocale)
