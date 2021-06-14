import { fireEvent, screen } from "@testing-library/dom"
import NewBillUI from "../views/NewBillUI.js"
import NewBill from "../containers/NewBill.js"
import { localStorageMock } from "../__mocks__/localStorage.js"
import firestore from "../app/Firestore";

describe("Given I am connected as an employee", () => {
  describe("WHEN I am on new bill page and I do not fill the field", () => {
    test("THEN It should not submit", () => {
      
      jest.mock('../app/firestore')
      
      //console.log(document.body.innerHTML)
      const onNavigate = (pathname) => {
        document.body.innerHTML = ROUTES({ pathname })
      }
      //Mock the function
      firestore.storage = () => ({bills, get: jest.fn().mockResolvedValue()})

      Object.defineProperty(window, "localStorage", {
        value: localStorageMock
      });
      //Mock a user
      const user = JSON.stringify({
        type: 'Employee'
      })
      window.localStorage.setItem('user', user)
      const html = NewBillUI()
      document.body.innerHTML = html
      const newBill = new NewBill({document, onNavigate, firestore, localStorage: window.localStorage})
//console.log(document.body.innerHTML)
      newBill.fileName = "foo.jpg"
      const inputFile = screen.getByTestId("file")
      
      const form = screen.getByTestId("form-new-bill")
      const handleChangeFile = jest.fn(newBill.handleChangeFile)
      
      inputFile.addEventListener("change", handleChangeFile)

      let file = new File(["foo.jpg"], "foo.jpg", {
        type: "image/jpg"
      });
      //(["image.png"], "image.png", { type: "image/png" })

      console.log(file)
      /* fireEvent.change(inputFile, {target : {files : [file]} } ) */
      fireEvent.change(inputFile, {
        target: {
          files: [new File(["image.jpg"], "image.jpg", { type: "image/jpg" })],
        },
      });
/*       fireEvent.change(getByLabelText(/picture/i), {
        target: {
          files: [new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' })],
        },
      }) */
/* 
      fireEvent.change((form)) 
      console.log(inputFile[0]) */
      //expect(handleChangeFile).toHaveBeenCalled()
      expect(handleChangeFile).toHaveBeenCalled();
      expect(inputFile.files[0].name).toBe("foo.jpg");
    })
    
  })
})