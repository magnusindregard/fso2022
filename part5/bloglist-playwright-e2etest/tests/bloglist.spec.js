const { test, expect, beforeEach, beforeAll, describe } = require('@playwright/test')
const exp = require('constants')

describe('Blog app', () => {
  describe.configure({ mode: 'serial' })

  beforeAll(async ({ request }) => {
    await request.post('http://localhost:3001/api/testing/reset')
    await request.post('http://localhost:3001/api/users', {
      data: {
        name: 'Magnus Indregard',
        username: 'magnus',
        password: 'password'
      }
    })
    await request.post('http://localhost:3001/api/users', {
      data: {
        name: 'Another User',
        username: 'another',
        password: 'notthesame'
      }
    })

  })

  beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000')
  })

  test('Login form is shown', async ({ page }) => {
    const locator = await page.getByText('login')
    await expect(locator).toBeVisible()
  })

  describe('Login', () => {
    describe.configure({ mode: 'serial' })
    test('succeeds with correct credentials', async ({ page }) => {
      const textboxes = await page.getByRole('textbox').all()
      await textboxes[0].fill('magnus')
      await textboxes[1].fill('password')

      await page.getByRole('button', { name: 'login' }).click()

      await expect(page.getByText('Magnus Indregard logged in')).toBeVisible()

    })

    test('fails with wrong credentials', async ({ page }) => {
      const textboxes = await page.getByRole('textbox').all()
      await textboxes[0].fill('magnus')
      await textboxes[1].fill('ldskls')

      await page.getByRole('button', { name: 'login' }).click()

      await expect(page.getByText('invalid username or password')).toBeVisible()

    })
  })

  describe('Blogging', () => {
    describe.configure({ mode: 'serial' })

    beforeEach(async ({ page }) => {
      const logininputs = await page.getByRole('textbox').all()
      await logininputs[0].fill('magnus')
      await logininputs[1].fill('password')

      await page.getByRole('button', { name: 'login' }).click()
      await page.getByText('Magnus Indregard logged in').waitFor()

    })

    test('Logged in user can add a blog', async ({ page }) => {

      await page.getByRole('button', { name: 'Add blog' }).click()
      const bloginputs = await page.getByRole('textbox').all()
      await bloginputs[0].fill('New title')
      await bloginputs[1].fill('New author')
      await bloginputs[2].fill('New URL')
      await page.getByRole('button', { name: 'Create' }).click()
      await expect(page.getByRole('heading', { name: 'New title by New author' })).toBeVisible()
    })

    test('Blog detail can be opened', async ({ page }) => {

      await page.getByRole('button', { name: 'Show details' }).click()
      await expect(page.getByRole('Button', { name: 'Like' })).toBeVisible()

    })

    test('Blog can be liked', async ({ page }) => {
      await page.getByRole('button', { name: 'Show details' }).click()
      page.getByRole('Button', { name: 'Like' }).waitFor()
      await page.getByRole('Button', { name: 'Like' }).click()
      await expect(page.getByText('Likes: 1')).toBeVisible()
    })

    test('Only the user who added the blog can see the delete button', async ({ page }) => {

      await page.getByRole('button', { name: 'Show details' }).click()
      await expect(page.getByRole('Button', { name: 'Delete' })).toBeVisible()

      await page.getByRole('button', { name: 'Log out' }).click()
      page.getByRole('button', { name: 'Login' }).waitFor()

      const textboxes = await page.getByRole('textbox').all()
      await textboxes[0].fill('another')
      await textboxes[1].fill('notthesame')

      await page.getByRole('button', { name: 'login' }).click()
      page.getByRole('button', { name: 'Show details' }).waitFor()
      await page.getByRole('button', { name: 'Show details' }).click()
      page.getByRole('Button', { name: 'Like' }).waitFor()

      await expect(page.getByRole('Button', { name: 'Delete' })).toHaveCount(0)
    })

    test('Blog can be deleted by the user who posted it', async ({ page }) => {
      await page.getByRole('button', { name: 'Show details' }).click()
      page.getByRole('Button', { name: 'Delete' }).waitFor()
      page.on('dialog', dialog => dialog.accept());
      await page.getByRole('Button', { name: 'Delete' }).click()
      await expect(page.getByRole('heading', { name: 'New title by New author' })).toHaveCount(0)
    })



  })

  describe('sorting by number of likes', () => {
    describe.configure({ mode: 'serial' })
    beforeEach(async ({ request, page }) => {
      await request.post('http://localhost:3001/api/testing/reset-to-test-mode')
      await page.goto('http://localhost:3000')
    })

    test('blogs are sorted descending by number of likes', async ({ page }) => {

      const logininputs = await page.getByRole('textbox').all()
      await logininputs[0].fill('magnus')
      await logininputs[1].fill('password')

      await page.getByRole('button', { name: 'login' }).click()
      await page.getByText('Magnus Indregard logged in').waitFor()
      await page.getByRole('heading', { name: 'TDD harms architecture' }).waitFor()

      await page.locator('p').first().waitFor()
      let count = await page.locator('p').filter({ hasText: 'Likes'}).count()
      
      const allLikes = await page.locator('p').filter({ hasText: 'Likes'}).all()
      let likesArray = []

      for await (let like of allLikes) { 
        const likeText = await like.innerText()
        const likeInt  = parseInt(likeText.match(/\d+/)[0])
        likesArray = likesArray.concat(likeInt)
      }

      for (let [index, like] of likesArray.entries())  {
        if (index < count - 1) {
          expect(likesArray[index]).toBeGreaterThanOrEqual(likesArray[index + 1])
        }
        index++
      }
      
    })
  })
    
})