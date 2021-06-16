import { fireEvent, screen } from "@testing-library/dom"
import NewBillUI from "../views/NewBillUI.js"
import NewBill from "../containers/NewBill.js"
import { localStorageMock } from "../__mocks__/localStorage.js"
import firestore from "../app/Firestore";
import firebase from "../__mocks__/firebase.js"

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

//test d'integration POST
describe("When i am connected as employe, And i try to submit a bill", ()=>{
    test("Then a call to the POST API should be done", async ()=>{
      const spyPost = jest.spyOn(firebase, "post");
      const newBill =  {
        "id": "47qAXb6fIm2zOKkLzMro",
        "vat": "80",
        "fileUrl": "https://firebasestorage.googleapis.com/v0/b/billable-677b6.a…f-1.jpg?alt=media&token=c1640e12-a24b-4b11-ae52-529112e9602a",
        "status": "pending",
        "type": "Hôtel et logement",
        "commentary": "séminaire billed",
        "name": "encore",
        "fileName": "preview-facture-free-201801-pdf-1.jpg",
        "date": "2004-04-04",
        "amount": 400,
        "commentAdmin": "ok",
        "email": "a@a",
        "pct": 20
      }
      await firebase.post(newBill);
      expect(spyPost).toHaveBeenCalledTimes(1);
      expect(spyPost).toHaveBeenCalledWith({
        "id": "47qAXb6fIm2zOKkLzMro",
        "vat": "80",
        "fileUrl": "https://firebasestorage.googleapis.com/v0/b/billable-677b6.a…f-1.jpg?alt=media&token=c1640e12-a24b-4b11-ae52-529112e9602a",
        "status": "pending",
        "type": "Hôtel et logement",
        "commentary": "séminaire billed",
        "name": "encore",
        "fileName": "preview-facture-free-201801-pdf-1.jpg",
        "date": "2004-04-04",
        "amount": 400,
        "commentAdmin": "ok",
        "email": "a@a",
        "pct": 20
      })
  })
})