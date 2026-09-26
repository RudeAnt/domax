/**
 * Тонкая тёмная полоса с названием бренда — присутствует на каждом экране
 * в макетах Figma поверх обычного PageHeader с заголовком страницы.
 * Рендерится один раз в App.tsx, а не в каждой странице.
 */
export function BrandBar() {
  return (
    <div className="brand-bar">
      <span className="brand-bar__name">DOМАКС</span>
    </div>
  )
}
