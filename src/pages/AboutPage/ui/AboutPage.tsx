import { useTranslation } from 'react-i18next'

const AboutPage = () => {
    const { t } = useTranslation()
    return <div>{t('СТРАНИЦА О САЙТЕ')}</div>
}

export default AboutPage
