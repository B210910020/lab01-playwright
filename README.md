# Лаб 1 — UI автомат тест (Playwright)

**Овог нэр:** Г.Хосбаяр
**Оюутны код:** B210910020

Сайт: [saucedemo.com](https://www.saucedemo.com) · Хэл: TypeScript · Хөтөч: Chromium

## Ажиллуулах

```bash
npm install
npx playwright install chromium
npx playwright test            # 3 тест
npx playwright show-report     # HTML тайлан
```

## Юу хийсэн

`tests/mytest.spec.ts` — 3 тест, тус бүр `logout`-оор төгсөнө, хоорондоо хамааралгүй:

1. **амжилттай нэвтрэх** — `toHaveURL(/inventory/)`, `toHaveText('Products')`
2. **буруу нууц үг** — алдааны мессеж `toHaveText(...)`
3. **бараа сагслах** — сагсны тэмдэг `1`, сагсанд бараа харагдана

Locator: `getByPlaceholder`, `getByRole`, `getByText`, `getByTestId` (`data-test`). XPath-аас зайлсхийсэн — DOM-ын бүтэц өөрчлөгдөхөд эвдэрдэг, уншихад хэцүү, хэрэглэгчийн харж буйг (role, текст) илэрхийлдэггүй.

## Trace, тайлан, бичлэг

- `playwright-report/` — HTML тайлан (тест бүрийн видео хавсралттай). `npx playwright show-report`
- `traces/*.zip` — тест бүрийн trace. `npx playwright show-trace traces/login-success.zip`
- `traces/intentional-fail.zip` — сагсны тоог зориуд `'2'` болгож унагаасан trace: Expected `"2"`, Received `"1"` гэж яг аль алхам дээр унасныг DOM snapshot-той харуулна.

Анхны ажиллуулалтад Logout-ыг `getByRole('link')` гэж бичсэн тул 2 тест timeout-оор унасан; error-context/trace-ээс Logout нь `button` болохыг хараад зассан.

## Playwright ба Selenium — ажиглалт

Playwright-д `click`, `fill`, `expect` бүр элемент бэлэн болтол автоматаар хүлээдэг тул Selenium-д заавал бичдэг `WebDriverWait`-ийн код огт хэрэггүй болсон.
Хөтчийг `npx playwright install` нэг командаар суулгасан, ChromeDriver-ийн хувилбар тааруулах асуудал гараагүй.
`getByRole`, `getByTestId` зэрэг locator нь хэрэглэгчийн харж буй зүйлээр элемент олдог тул XPath-аас уншихад амар, тогтвортой.
Тест бүр шинэ browser context-д ажилладаг тул cookie, session-ийг гараар цэвэрлэх шаардлагагүй, isolation анхдагчаар хангагддаг.
Trace viewer нь алдааг олоход хамгийн их тус болсон — Logout элементийн role буруу байсныг шууд харуулсан.
Selenium нь илүү олон хэл, хуучин хөтөч, том community-тэй хэвээр байгаа нь давуу тал.
Харин шинэ төсөлд Playwright-ийн хурд (3 тест ~3с, зэрэгцээ) ба дебаг хэрэгслүүд илүү тохиромжтой санагдсан.
