import { useTranslation } from 'react-i18next'

function AboutPage() {
    const { t } = useTranslation()
    return <div>{t('СТРАНИЦА О САЙТЕ')}</div>
}

export default AboutPage
