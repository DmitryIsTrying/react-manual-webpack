import fs from 'fs'
import path from 'path'
import { parseKeysFromDirectory } from './parseText'

function fillTranslations(
    keys: Set<string>,
    locales: string[],
    mainLocale: string,
    defaultValue = 'НУЖЕНПЕРЕВОД'
) {
    const keysArray = Array.from(keys)

    locales.forEach((locale) => {
        const translations: Record<string, string> = {}

        keysArray.forEach((key) => {
            // В основной локали ключ = значению, в остальных — ключ = defaultValue
            translations[key] = locale === mainLocale ? key : defaultValue
        })

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
    })
}

// Пример использования
const dirPath = process.argv[2] || path.join(__dirname, '../../../../src') // Путь к директории с ключами
const locales = ['ru', 'en'] // Локали для перевода
const mainLocale = 'ru' // Основная локаль, где ключ = значению

const keys = parseKeysFromDirectory(dirPath)
fillTranslations(keys, locales, mainLocale)
