//
//  ViewController.swift
//  Mechaphonix
//
//  Created by Gavin Loughridge on 2/7/18.
//  Copyright © 2018 Gavin Loughridge. All rights reserved.
//

import UIKit
import Foundation
import SocketIO

class ViewController: UIViewController {
    @IBOutlet weak var reciveLabel: UILabel!
    let manager = SocketManager(socketURL: URL(string: "http://localhost:3000")!, config: [.log(true), .compress])

    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
        NotificationCenter.default.removeObserver(self,
                                                  name: messageRecived,
                                                  object: nil)
        NotificationCenter.default.addObserver(self,
                                               selector: #selector(displayMessage),
                                               name: messageRecived,
                                               object: nil)
        let socket = manager.defaultSocket

        socket.on(clientEvent: .connect) {data, ack in
            print("socket connected")
        }
        print("attempting connect")
        socket.connect()
    }

    @objc func displayMessage(notification: NSNotification) {
        reciveLabel.text = "recived"
        let socket = manager.defaultSocket
        if let message = notification.userInfo?["Instant"] as? String {
            reciveLabel.text = message
            socket.emit("pulse message", ["pulse": message])
        }
    }

    override func viewWillDisappear(_ animated: Bool) {
        super.viewWillDisappear(animated)

        NotificationCenter.default.removeObserver(self,
                                                  name: messageRecived,
                                                  object: nil)
    }

    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
        reciveLabel.text = "loaded"
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }


}
