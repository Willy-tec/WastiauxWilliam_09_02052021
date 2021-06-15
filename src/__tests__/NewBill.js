import { fireEvent, screen } from "@testing-library/dom"
import NewBillUI from "../views/NewBillUI.js"
import NewBill from "../containers/NewBill.js"
import { localStorageMock } from "../__mocks__/localStorage.js"
import firestore from "../app/Firestore";

describe("Given I am connected as an employee", () => {
  describe("WHEN I am on new bill page and I  fill the file field", () => {
    test("THEN It should register the filename", () => {
      
      const onNavigate = (pathname) => {
        document.body.innerHTML = ROUTES({ pathname })
      }

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
      
      const newBill = new NewBill({document, onNavigate, firestore: null, localStorage: window.localStorage})

      const fileInputDiv = screen.getByTestId("file")

      const handleChangeFile = jest.fn(newBill.handleChangeFile)
      
      fileInputDiv.addEventListener("change", handleChangeFile)

      let file = new File(["foo.jpg"], "foo.jpg", {
        type: "image/jpg"
      });

      fireEvent.change(fileInputDiv, {
        target: {
          files: [file]
        },
      });

      expect(handleChangeFile).toHaveBeenCalled();
      expect(fileInputDiv.files[0].name).toBe("foo.jpg");
    })
    
  })
})