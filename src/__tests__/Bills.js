import { screen } from "@testing-library/dom"
import BillsUI from "../views/BillsUI.js"
import { bills } from "../fixtures/bills.js"
import { ROUTES, ROUTES_PATH } from "../constants/routes.js"
import Router from "../app/Router.js"
//import VerticalLayout from '../views/VerticalLayout'
import firestore from "../app/Firestore"
import { localStorageMock } from "../__mocks__/localStorage.js"
import { invertFormatDate } from "../app/format.js"

describe("Given I am connected as an employee", () => {
  describe("When I am on Bills Page", () => {
    test("Then bill icon in vertical layout should be highlighted", () => {
      //Make root div for Router()
      const rootDiv = document.createElement("div")
      rootDiv.id = "root"
      document.body.appendChild(rootDiv)
      
      //Mock the function
      firestore.bills = () => ({bills, get: jest.fn().mockResolvedValue()})
      //Mock a user
      const user = JSON.stringify({
        type: 'Employee'
      })
      window.localStorage.setItem('user', user)
      //Mock the location
      Object.defineProperty(window, 'location', { value:{
        hash: ROUTES_PATH['Bills']
      }  })

      //Initialise the page
      Router()
      //console.log(document.body.innerHTML)
      const billIcon = screen.getByTestId("icon-window")
      console.log(billIcon)
      expect(billIcon.className).toBe("active-icon")
      //expect(billIcon).toHaveClass("active-icon")
      

    })
    test("Then bills should be ordered from earliest to latest", () => {
      const html = BillsUI({ data: bills })
      document.body.innerHTML = html
      const dates = screen.getAllByText(/(?<day>[0-9]{0,2})[ ](?<month>[a-zA-Z]+)[.][ ](?<year>[0-9]{2})/).map(a => a.innerHTML)
      console.log(dates)
      const antiChrono = (a, b) => ((invertFormatDate(a) < invertFormatDate(b)) ? 1 : -1)
      const datesSorted = [...dates].sort(antiChrono)
      expect(dates).toEqual(datesSorted)
    })
  })
})



//   /^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/i