import { useTranslation } from 'react-i18next'

const MainPage = () => {
    const { t } = useTranslation()
    return <div>{t('ГЛАВНАЯ СТРАНИЦА')}</div>
}

export default MainPage
