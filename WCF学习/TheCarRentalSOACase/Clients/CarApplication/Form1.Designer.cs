namespace CarApplication
{
    partial class Form1
    {
        /// <summary>
        /// 必需的设计器变量。
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// 清理所有正在使用的资源。
        /// </summary>
        /// <param name="disposing">如果应释放托管资源，为 true；否则为 false。</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows 窗体设计器生成的代码

        /// <summary>
        /// 设计器支持所需的方法 - 不要
        /// 使用代码编辑器修改此方法的内容。
        /// </summary>
        private void InitializeComponent()
        {
            this.btnListCars = new System.Windows.Forms.Button();
            this.btnInsertNewCar = new System.Windows.Forms.Button();
            this.btnGetCarPicture = new System.Windows.Forms.Button();
            this.listBox1 = new System.Windows.Forms.ListBox();
            this.pictureBox1 = new System.Windows.Forms.PictureBox();
            this.textBox1 = new System.Windows.Forms.TextBox();
            ((System.ComponentModel.ISupportInitialize)(this.pictureBox1)).BeginInit();
            this.SuspendLayout();
            // 
            // btnListCars
            // 
            this.btnListCars.Location = new System.Drawing.Point(12, 12);
            this.btnListCars.Name = "btnListCars";
            this.btnListCars.Size = new System.Drawing.Size(95, 23);
            this.btnListCars.TabIndex = 0;
            this.btnListCars.Text = "ListCars";
            this.btnListCars.UseVisualStyleBackColor = true;
            this.btnListCars.Click += new System.EventHandler(this.btnListCars_Click);
            // 
            // btnInsertNewCar
            // 
            this.btnInsertNewCar.Location = new System.Drawing.Point(12, 53);
            this.btnInsertNewCar.Name = "btnInsertNewCar";
            this.btnInsertNewCar.Size = new System.Drawing.Size(95, 23);
            this.btnInsertNewCar.TabIndex = 1;
            this.btnInsertNewCar.Text = "InsertNewCar";
            this.btnInsertNewCar.UseVisualStyleBackColor = true;
            this.btnInsertNewCar.Click += new System.EventHandler(this.btnInsertNewCar_Click);
            // 
            // btnGetCarPicture
            // 
            this.btnGetCarPicture.Location = new System.Drawing.Point(12, 91);
            this.btnGetCarPicture.Name = "btnGetCarPicture";
            this.btnGetCarPicture.Size = new System.Drawing.Size(95, 23);
            this.btnGetCarPicture.TabIndex = 2;
            this.btnGetCarPicture.Text = "GetCarPicture";
            this.btnGetCarPicture.UseVisualStyleBackColor = true;
            this.btnGetCarPicture.Click += new System.EventHandler(this.btnGetCarPicture_Click);
            // 
            // listBox1
            // 
            this.listBox1.FormattingEnabled = true;
            this.listBox1.ItemHeight = 12;
            this.listBox1.Location = new System.Drawing.Point(128, 12);
            this.listBox1.Name = "listBox1";
            this.listBox1.Size = new System.Drawing.Size(233, 220);
            this.listBox1.TabIndex = 3;
            // 
            // pictureBox1
            // 
            this.pictureBox1.Location = new System.Drawing.Point(384, 12);
            this.pictureBox1.Name = "pictureBox1";
            this.pictureBox1.Size = new System.Drawing.Size(330, 360);
            this.pictureBox1.TabIndex = 4;
            this.pictureBox1.TabStop = false;
            // 
            // textBox1
            // 
            this.textBox1.Location = new System.Drawing.Point(12, 238);
            this.textBox1.Multiline = true;
            this.textBox1.Name = "textBox1";
            this.textBox1.Size = new System.Drawing.Size(349, 257);
            this.textBox1.TabIndex = 5;
            // 
            // Form1
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 12F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(726, 507);
            this.Controls.Add(this.textBox1);
            this.Controls.Add(this.pictureBox1);
            this.Controls.Add(this.listBox1);
            this.Controls.Add(this.btnGetCarPicture);
            this.Controls.Add(this.btnInsertNewCar);
            this.Controls.Add(this.btnListCars);
            this.Name = "Form1";
            this.Text = "Form1";
            ((System.ComponentModel.ISupportInitialize)(this.pictureBox1)).EndInit();
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.Button btnListCars;
        private System.Windows.Forms.Button btnInsertNewCar;
        private System.Windows.Forms.Button btnGetCarPicture;
        private System.Windows.Forms.ListBox listBox1;
        private System.Windows.Forms.PictureBox pictureBox1;
        private System.Windows.Forms.TextBox textBox1;
    }
}

