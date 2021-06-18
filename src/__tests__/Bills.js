 import { fireEvent, screen } from "@testing-library/dom"
import BillsUI from "../views/BillsUI.js"
import { bills } from "../fixtures/bills.js"
import { ROUTES, ROUTES_PATH } from "../constants/routes.js"
import Router from "../app/Router.js"
//import VerticalLayout from '../views/VerticalLayout'
import firestore from "../app/Firestore"
import { localStorageMock } from "../__mocks__/localStorage.js"
import { invertFormatDate } from "../app/format.js"
import Bills from "../containers/Bills.js"
import userEvent from "@testing-library/user-event"
import firebase from "../__mocks__/firebase.js"

describe("Given I am connected as an employee", () => {
  
  describe("When I am on Bills Page", () => {
    /*  
    */
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

      expect(billIcon.className).toBe("active-icon")
    

    })

    test("Then bills should be ordered from earliest to latest", () => {
      const html = BillsUI({ data: bills })
      document.body.innerHTML = html
      const dates = screen.getAllByText(/(?<day>[0-9]{0,2})[ ](?<month>[a-zA-Z]+)[.][ ](?<year>[0-9]{2})/).map(a => a.innerHTML)
      const antiChrono = (a, b) => ((invertFormatDate(a) < invertFormatDate(b)) ? 1 : -1)
      const datesSorted = [...dates].sort(antiChrono)
      expect(dates).toEqual(datesSorted)
    })
    
    test("Then loading page should appear before data is loaded", ()=>{
      const html = BillsUI({ loading : true})
      document.body.innerHTML = html
      const loading = screen.getAllByText("Loading...")
      expect(loading).toBeTruthy()
    })

    test("Then if error is throw, an error page should appear", ()=>{
      const html = BillsUI({ error : "message erreur"})
      document.body.innerHTML = html
      const errorPage = screen.getAllByText("message erreur")
      expect(errorPage).toBeTruthy()
    })

    
    test(("Then, the click on the icon eyes should open modal"),async ()=>{
      const html = BillsUI({ data : bills})
      document.body.innerHTML = html

      Object.defineProperty(window, 'location', { value:{
        hash: ROUTES_PATH['Bills']
      }  })

      //Mock the function
      firestore.bills = () => ({bills, get: jest.fn().mockResolvedValue()})
      //Mock a user
      const user = JSON.stringify({
        type: 'Employee'
      })
      window.localStorage.setItem('user', user)

      const onNavigate = (pathname) => {
        document.body.innerHTML = ROUTES({ pathname })
      }

      $.fn.modal = jest.fn();
      let billed = new Bills({document, onNavigate, firestore, localStorage })


      const iconEye = screen.getAllByTestId("icon-eye")[0]
      const handleClickIconEyeMock = jest.fn((e)=> billed.handleClickIconEye(iconEye))
      iconEye.addEventListener('click', handleClickIconEyeMock)
      userEvent.click(iconEye)
           
      expect(handleClickIconEyeMock).toHaveBeenCalled()
      
      expect($.fn.modal).toHaveBeenCalled()
      
      const modale = screen.getByTestId('modaleFile')
      expect(modale).toBeTruthy()
      
    })
    
    test("Then a click on new bill icon should open the new bill page", ()=>{
      const html = BillsUI({ data : bills})
      document.body.innerHTML = html

      Object.defineProperty(window, 'location', { value:{
        hash: ROUTES_PATH['Bills']
      }  })

      //Mock the function
      firestore.bills = () => ({bills, get: jest.fn().mockResolvedValue()})
      //Mock a user
      const user = JSON.stringify({
        type: 'Employee'
      })
      window.localStorage.setItem('user', user)

      const onNavigate = (pathname) => {
        document.body.innerHTML = ROUTES({ pathname })
      }

      $.fn.modal = jest.fn();
      let billed = new Bills({document, onNavigate, firestore, localStorage })
      const newBillIcon = screen.getByTestId("btn-new-bill")
      const handleClickNewBillMock =  jest.fn((e)=> billed.handleClickNewBill(e))
      newBillIcon.addEventListener('click', handleClickNewBillMock)
      fireEvent.click(newBillIcon)
      

      expect(handleClickNewBillMock).toHaveBeenCalled()
      expect(screen.getByTestId("form-new-bill")).toBeTruthy()

    })
  })
})

// test d'integration get
describe("Given I am a user connected as Employee", ()=>{
  describe("When I navigate to bills page", ()=>{
    test("fetches bills from mock API GET", async()=>{
      const getSpy = jest.spyOn(firebase, "get")
      const bills = await firebase.get()
      expect(getSpy).toHaveBeenCalledTimes(1)
      expect(bills.data.length).toBe(4);
    })
  })
  test("fetches bills from an API and fails with 404 message error", async () => {
    firebase.get.mockImplementationOnce(() =>
      Promise.reject(new Error("Erreur 404"))
    )
    const html = BillsUI({ error: "Erreur 404" })
    document.body.innerHTML = html
    const message = await screen.getByText(/Erreur 404/)
    expect(message).toBeTruthy()
  })
  test("fetches messages from an API and fails with 500 message error", async () => {
    firebase.get.mockImplementationOnce(() =>
      Promise.reject(new Error("Erreur 500"))
    )
    const html = BillsUI({ error: "Erreur 500" })
    document.body.innerHTML = html
    const message = await screen.getByText(/Erreur 500/)
    expect(message).toBeTruthy()
  })
})

